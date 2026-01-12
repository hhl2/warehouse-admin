<template>
  <div class="bigpg">
    <router-view />
  </div>
</template>

<script>
import { ref, provide, onMounted, onUnmounted, readonly, nextTick } from 'vue'
import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4'
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4'
import { useRouter } from 'vue-router'

// 默认配置，当外部配置加载失败时使用
const DEFAULT_CONFIG = {
  pixelStreaming: {
    websocketURL: 'ws://192.168.31.143:88',
    ss: 'ws://192.168.31.143:88'
  }
}

export default {
  name: 'PlayerView',

  setup() {
    const router = useRouter()
    const ueData = ref(null)
    const clickPosition = ref({ x: 0, y: 0 })

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
    // 使用外部配置文件，打包后可直接修改 public/config.json 而无需重新编译
    // 加载配置：优先使用外部配置，失败则使用默认配置
    const loadConfig = async () => {
      try {
        const res = await fetch('/config.json')
        if (res.ok) {
          const config = await res.json()
          console.log('✅ 加载外部配置成功:', config)
          return config
        }
        console.warn('⚠️ 配置文件响应异常，使用默认配置')
        return DEFAULT_CONFIG
      } catch {
        console.error('加载配置失败，使用默认配置')
        return DEFAULT_CONFIG
      }
    }

    const initializePixelStreaming = async () => {
      try {
        const { pixelStreaming: psConfig } = await loadConfig()
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
            WaitForStream: true
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
    })

    onUnmounted(() => {
      cleanup()
    })

    // ========== 提供响应式数据和方法 ==========
    provide('ueResponseData', readonly(ueData))
    // provide('connectionState', readonly(connectionState))  // 新增：提供连接状态
    provide('playerMethods', {
      sendMessage,
      getUeData: () => ueData.value,
      // getConnectionState: () => connectionState.value,  // 新增：获取连接状态
      // reconnect: attemptReconnect  // 新增：手动触发重连
    })

    return {
      ueData,
      clickPosition,
      connectionState  // 新增：暴露连接状态
    }
  }
}
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  min-height: -webkit-fill-available;
  font-family: 'Montserrat';
  margin: 0;
}
</style>