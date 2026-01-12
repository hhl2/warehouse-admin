<template>
  <div class="bigpg">
    <router-view />
  </div>
</template>

<script>
import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.4';

// 常量定义
const SAFETY_MARGIN = 10;
const RESPONSE_EVENT_NAME = 'handle_responses';

export default {
  name: 'PlayerView',

  data() {
    return {
      ueData: null,
      pixelStreaming: null,
      application: null,
      clickPosition: {
        x: 0,
        y: 0
      },
      // 响应式数据包装
      reactiveData: {
        ueResponse: null,
        showMenus: false
      }
    };
  },

  computed: {
    // 计算属性用于提供响应式数据
    provideData() {
      return {
        ueResponseData: this.reactiveData,
        clickPosition: this.clickPosition
      };
    }
  },

  async mounted() {
    await this.initializePixelStreaming();
    this.setupEventListeners();
  },

  beforeDestroy() {
    this.cleanup();
  },

  methods: {
    /**
     * 初始化 PixelStreaming
     */
    async initializePixelStreaming() {
      try {
        // 初始化样式
        const pixelStreamingApplicationStyles = new PixelStreamingApplicationStyle();
        pixelStreamingApplicationStyles.applyStyleSheet();

        // 配置
        const config = new Config({
          useUrlParams: true,
          initialSettings: {
            // WebSocket 配置
            // websocketURL: 'ws://127.0.0.1:88',
            // 或分别指定主机和端口
            // websocketHost: '127.0.0.1',
            // websocketPort: 88
          }
        });

        // 创建 PixelStreaming 实例
        const stream = new PixelStreaming(config);
        this.pixelStreaming = stream;

        // 创建应用实例
        const application = new Application({
          stream,
          onColorModeChanged: (isLightMode) =>
            pixelStreamingApplicationStyles.setColorMode(isLightMode),
          settings: {
            showUI: false
          }
        });
        this.application = application;

        // 添加响应监听器
        stream.addResponseEventListener(RESPONSE_EVENT_NAME, this.handleResponse);

        // 添加到 DOM
        document.body.appendChild(application.rootElement);

        console.log('PixelStreaming 初始化成功');
      } catch (error) {
        console.error('PixelStreaming 初始化失败:', error);
        this.$notify({
          title: '初始化失败',
          message: '无法连接到 UE 服务',
          type: 'error'
        });
      }
    },

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
      window.addEventListener('click', this.handleCaptureClick);
      window.addEventListener('resize', this.handleWindowResize);
    },

    /**
     * 处理点击事件
     */
    handleCaptureClick(event) {
      this.clickPosition = {
        x: event.clientX,
        y: event.clientY
      };
    },

    /**
     * 处理窗口大小变化
     */
    handleWindowResize() {
      // 可以在这里添加窗口大小变化时的处理逻辑
      if (this.reactiveData.showMenus) {
        this.$nextTick(() => {
          this.$emit('adjustMenuPosition');
        });
      }
    },

    /**
     * 处理 UE 响应
     */
    handleResponse(res) {
      try {
        const jsonRes = JSON.parse(res);
        console.log('UE 响应数据:', jsonRes);

        // 更新响应式数据
        this.reactiveData.ueResponse = jsonRes;
        this.reactiveData.showMenus = true;

        // 创建完整数据对象
        this.ueData = {
          clickPosition: { ...this.clickPosition },
          json: jsonRes,
          showMenus: true
        };

        // 处理特定类型的响应
        this.handleSpecificResponse(jsonRes);

      } catch (error) {
        console.error('解析 UE 响应失败:', error, '原始数据:', res);
      }
    },

    /**
     * 处理特定类型的响应
     */
    handleSpecificResponse(jsonRes) {
      const responseHandlers = {
        JCZX: () => this.handleInspectionStation(jsonRes),
        // 可以添加其他响应类型的处理
        // OTHER_TYPE: () => this.handleOtherType(jsonRes)
      };

      const handler = responseHandlers[jsonRes.id];
      if (handler) {
        handler();
      } else {
        console.log('未知的响应类型:', jsonRes.id);
      }
    },

    /**
     * 处理检测工站响应
     */
    handleInspectionStation(jsonRes) {
      console.log('打开检测工位:', jsonRes);

      try {
        // 保存到本地存储
        localStorage.setItem('roadinfo', JSON.stringify(jsonRes.data));

        // 路由跳转
        this.$nextTick(() => {
          this.$router.push({
            path: '/Inspection'
          });
        });
      } catch (error) {
        console.error('处理检测工站数据失败:', error);
      }
    },

    /**
     * 发送消息到 UE
     */
    sendMessage(message) {
      if (!this.pixelStreaming) {
        console.warn('PixelStreaming 实例未初始化');
        return;
      }

      try {
        this.pixelStreaming.emitUIInteraction(message);
        console.log('消息发送成功:', message);
      } catch (error) {
        console.error('消息发送失败:', error);
      }
    },

    /**
     * 获取 UE 数据
     */
    getUeData() {
      return this.ueData;
    },

    /**
     * 清理资源
     */
    cleanup() {
      // 移除事件监听器
      window.removeEventListener('click', this.handleCaptureClick);
      window.removeEventListener('resize', this.handleWindowResize);

      // 移除 PixelStreaming 事件监听器
      if (this.pixelStreaming) {
        this.pixelStreaming.removeResponseEventListener(RESPONSE_EVENT_NAME, this.handleResponse);
      }

      // 移除 DOM 元素
      if (this.application?.rootElement) {
        document.body.removeChild(this.application.rootElement);
      }

      console.log('资源清理完成');
    }
  },

  /**
   * 提供数据和方法给子组件
   */
  provide() {
    return {
      // 响应式数据
      ueResponseData: () => this.reactiveData,

      // 方法
      playerMethods: {
        sendMessage: this.sendMessage,
        getUeData: this.getUeData,
        getClickPosition: () => this.clickPosition
      },

      // 工具方法
      utils: {
        adjustMenuPosition: (menuRef, position) => this.adjustMenuPosition(menuRef, position)
      }
    };
  }
};
</script>

<style scoped>
.bigpg {
  width: 100%;
  height: 100%;
}

/* 全局样式 */
:global(body) {
  width: 100vw;
  height: 100vh;
  min-height: -webkit-fill-available;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  overflow: hidden;
}

:global(#app) {
  width: 100%;
  height: 100%;
}
</style>