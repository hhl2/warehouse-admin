<template>
  <!-- <v-scale-screen width="1920" height="1080" :fullScreen="true"> -->
  <div class="bigpg" :class="{ 'hide-cursor': isCursorHidden }">
    <router-view />
  </div>
  <!-- </v-scale-screen> -->
</template>

<script>
// import VScaleScreen from 'vue3-scale-box'
import { ref, provide, onMounted, onUnmounted, readonly, nextTick, computed, watch } from 'vue'
import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4'
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4'
import { useRouter } from 'vue-router'
import { globalConfig } from '@/utils/request'

// 默认配置，当外部配置加载失败时使用
const DEFAULT_CONFIG = {
  pixelStreaming: {
    websocketURL: 'ws://10.151.223.209:88',
    ss: 'ws://10.151.223.209:88'
  }
}

export default {
  name: 'PlayerView',
  // components: {
  //   VScaleScreen
  // },

  setup() {
    const router = useRouter()
    const ueData = ref(null)
    const clickPosition = ref({ x: 0, y: 0 })

    // ========== 新增：鼠标隐藏状态控制 ==========
    const baseForceHidden = ref(false) // 是否被前端业务强制隐藏
    const isCtrlHeld = ref(false) // 是否按住了 Ctrl

    // 最终是否需要隐藏：只有在业务需要隐藏 且 没有按住Ctrl的时候，才隐藏
    const isCursorHidden = computed(() => {
      return baseForceHidden.value && !isCtrlHeld.value
    })

    const applyCursorState = (hidden) => {
      if (hidden) {
        document.body.classList.add('hide-cursor')
        if (pixelStreamingInstance && pixelStreamingInstance.config) {
            pixelStreamingInstance.config.setFlagEnabled('HoveringMouse', false)
        }
      } else {
        document.body.classList.remove('hide-cursor')
        if (pixelStreamingInstance && pixelStreamingInstance.config) {
            pixelStreamingInstance.config.setFlagEnabled('HoveringMouse', true)
        }
      }
    }

    watch(isCursorHidden, (newVal) => {
      applyCursorState(newVal)
    })

    const setCursorHidden = (hidden) => {
      baseForceHidden.value = hidden
      // 由于是 watch 监听，只要计算属性 isCursorHidden 发生变化，都会自动执行样式挂载和 UE 配置下发
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Control') {
        isCtrlHeld.value = true
      }
    }

    const handleKeyUp = (event) => {
      if (event.key === 'Control') {
        isCtrlHeld.value = false
      }
    }

    // ========== 新增：连接状态管理 ==========
    const connectionState = ref({
      isConnected: false,      // WebRTC 是否连接
      isStreaming: false,      // 是否正在接收视频流
      reconnectAttempts: 0,    // 重连尝试次数
      lastError: null          // 最后一次错误
    })
    const MAX_RECONNECT_ATTEMPTS = 3  // 最大重连次数
    const RECONNECT_DELAY = 2000      // 重连延迟(毫秒)

    let pixelStreamingInstance = null
    let applicationInstance = null
    let reconnectTimer = null  // 重连定时器

    // ========== 初始化 PixelStreaming ==========
    // 直接使用从 @/utils/request 初始化拿到的全局配置
    const getPsConfig = () => {
      if (globalConfig && globalConfig.pixelStreaming) {
         console.log('✅ 使用全局缓存 pixelStreaming 配置:', globalConfig.pixelStreaming)
         return globalConfig.pixelStreaming
      }
      console.warn('⚠️ 缓存配置读取异常，使用默认配置')
      return DEFAULT_CONFIG.pixelStreaming
    }

    const initializePixelStreaming = async () => {
      try {
        const psConfig = getPsConfig()
        console.log('WebSocket配置:', psConfig)

        // 应用样式
        const styles = new PixelStreamingApplicationStyle()
        styles.applyStyleSheet()

        // 创建流实例
        const config = new Config({
          useUrlParams: true,
          initialSettings: {
            websocketURL: psConfig.websocketURL,
            ss: psConfig.ss,
            MatchViewportRes: true,
            HoveringMouse: true,
            OfferToReceive: true,
            WaitForStream: true,
            AutoPlayVideo: true,        // 自动播放视频
            AutoConnect: true,           // 自动连接
            StartVideoMuted: true        // 静音启动以符合浏览器自动播放策略
          }
        })

        const stream = new PixelStreaming(config)
        pixelStreamingInstance = stream
        stream.addResponseEventListener('handle_responses', handleResponse)

        // 创建应用
        const app = new Application({
          stream,
          onColorModeChanged: (isLight) => styles.setColorMode(isLight),
          settings: { showUI: false }
        })
        applicationInstance = app
        document.body.appendChild(app.rootElement)

      } catch (error) {
        console.error('PixelStreaming初始化失败:', error)
      }
    }

    // ========== 新增：设置连接状态监听器 ==========
    // 原理：PixelStreaming 基于 WebRTC 技术，需要监听连接状态变化以便：
    // 1. 感知连接成功/失败
    // 2. 在断开时触发重连
    // 3. 向用户展示连接状态
    const setupConnectionListeners = (stream) => {
      // WebRTC 连接成功
      stream.addEventListener('webRtcConnected', () => {
        console.log('✅ WebRTC 连接成功')
        connectionState.value.isConnected = true
        connectionState.value.reconnectAttempts = 0  // 重置重连计数
        connectionState.value.lastError = null
      })

      // WebRTC 断开连接
      stream.addEventListener('webRtcDisconnected', () => {
        console.log('❌ WebRTC 连接断开')
        connectionState.value.isConnected = false
        connectionState.value.isStreaming = false

        // 触发自动重连
        attemptReconnect()
      })

      // 视频流开始播放
      stream.addEventListener('playStream', () => {
        console.log('🎥 视频流开始播放')
        connectionState.value.isStreaming = true
      })

      // 视频流播放被拒绝（通常是自动播放策略阻止）
      stream.addEventListener('playStreamRejected', (event) => {
        console.warn('⚠️ 视频流播放被拒绝:', event)
        connectionState.value.lastError = '视频播放被浏览器阻止，请点击页面'
      })

      // 视频初始化完成
      stream.addEventListener('videoInitialized', () => {
        console.log('📺 视频初始化完成')
      })

      // WebRTC SDP 错误
      stream.addEventListener('webRtcSdp', () => {
        console.log('📡 WebRTC SDP 交换中...')
      })
    }

    // ========== 新增：自动重连机制 ==========
    // 原理：网络不稳定时 WebRTC 可能断开，自动重连可以提升用户体验
    // 使用递增延迟避免服务器压力过大
    const attemptReconnect = () => {
      if (connectionState.value.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.error('🚫 已达到最大重连次数，停止重连')
        connectionState.value.lastError = '连接失败，请刷新页面重试'
        return
      }

      connectionState.value.reconnectAttempts++
      const delay = RECONNECT_DELAY * connectionState.value.reconnectAttempts

      console.log(`🔄 将在 ${delay}ms 后尝试第 ${connectionState.value.reconnectAttempts} 次重连...`)

      reconnectTimer = setTimeout(() => {
        if (pixelStreamingInstance && !connectionState.value.isConnected) {
          console.log('🔄 正在重连...')
          try {
            pixelStreamingInstance.reconnect()
          } catch (error) {
            console.error('重连失败:', error)
            attemptReconnect()  // 继续尝试
          }
        }
      }, delay)
    }

    // ========== 事件处理函数 ==========
    const handleCaptureClick = (event) => {
      clickPosition.value = {
        x: event.clientX,
        y: event.clientY
      }
    }

    const handleResponse = (res) => {
      try {
        const jsonRes = JSON.parse(res)
        console.log('UE呼我的:', jsonRes)

        const data = {
          clickPosition: { ...clickPosition.value },
          json: jsonRes,
          showMenus: true
        }

        ueData.value = data
        handleSpecificResponse(jsonRes)

      } catch (error) {
        console.error('解析 UE 响应失败:', error)
      }
    }

    const handleSpecificResponse = (jsonRes) => {
      if (jsonRes.id === 'JCZX') {
        console.log('打开检测工位:', jsonRes)
        localStorage.setItem('roadinfo', JSON.stringify(jsonRes.data))
        nextTick(() => {
          router.push('/kb')
        })
      }
    }

    const sendMessage = (message) => {
      if (pixelStreamingInstance) {
        pixelStreamingInstance.emitUIInteraction(message)
      } else {
        console.warn('PixelStreaming 实例未初始化')
      }
    }

    // ========== 改进：清理函数 ==========
    // 原理：正确释放资源防止内存泄漏
    // 1. 移除事件监听器
    // 2. 清除定时器
    // 3. 断开 WebRTC 连接
    // 4. 移除 DOM 元素
    const cleanup = () => {
      // 1. 清除重连定时器
      if (reconnectTimer) {
        clearTimeout(reconnectTimer)
        reconnectTimer = null
      }

      // 2. 清理 PixelStreaming 实例
      if (pixelStreamingInstance) {
        pixelStreamingInstance.removeResponseEventListener('handle_responses', handleResponse)

        // 断开 WebRTC 连接（如果方法存在）
        if (typeof pixelStreamingInstance.disconnect === 'function') {
          pixelStreamingInstance.disconnect()
        }
        pixelStreamingInstance = null
      }

      // 3. 移除窗口事件监听
      window.removeEventListener('click', handleCaptureClick)

      // 4. 移除 DOM 元素
      if (applicationInstance?.rootElement && document.body.contains(applicationInstance.rootElement)) {
        document.body.removeChild(applicationInstance.rootElement)
      }
      applicationInstance = null

      console.log('PixelStreaming 资源已清理')
    }

    // ========== 生命周期 ==========
    onMounted(() => {
      initializePixelStreaming()
      window.addEventListener('click', handleCaptureClick)
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
    })

    onUnmounted(() => {
      cleanup()
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    })

    // ========== 提供响应式数据和方法 ==========
    provide('ueResponseData', readonly(ueData))
    // provide('connectionState', readonly(connectionState))  // 新增：提供连接状态
    provide('playerMethods', {
      sendMessage,
      getUeData: () => ueData.value,
      setCursorHidden
      // getConnectionState: () => connectionState.value,  // 新增：获取连接状态
      // reconnect: attemptReconnect  // 新增：手动触发重连
    })

    return {
      ueData,
      clickPosition,
      connectionState, // 新增：暴露连接状态
      isCursorHidden
    }
  }
}
</script>

<style>
/* 避免 UE Canvas 动态覆盖，必须加上 !important */
.hide-cursor, .hide-cursor * {
  cursor: none !important;
}

body {
  width: 100vw;
  height: 100vh;
  min-height: -webkit-fill-available;
  font-family: 'Montserrat';
  margin: 0;
  background-color: #000; /* 防止全屏比例不一致漏出白边 */
  overflow: hidden; /* 防止出现滚动条白边 */
}

/* 消除全屏时的浏览器默认边框/外边框/白底 */
html, :fullscreen, ::backdrop {
  background-color: #000 !important;
  outline: none !important;
  border: none !important;
}

video, canvas {
  outline: none !important;
  border: none !important;
}
</style>