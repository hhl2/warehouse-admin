import '@/styles/main.css'
// import '@/styles/inspection.scss';
// import '@/styles/alerts.scss';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setConfig } from '@/utils/request'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

const loadAndStartApp = async () => {
    try {
        const url = process.env.NODE_ENV === 'production' ? './config.json' : '/config.json'
        const response = await fetch(url);
        const config = await response.json();

        // 传递给 request.js 设置 Axios 的配置
        setConfig(config);
    } catch (e) {
        console.warn('⚠️ main.js 加载 config.json 失败，使用默认配置运行:', e);
        setConfig({}); // 加载失败也会设置一下空配置触发后面的逻辑
    }

    const app = createApp(App);
    app.use(router)
    app.use(ElementPlus, {
        locale: zhCn,
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    app.mount('#app')
};

// 在应用启动前加载配置
loadAndStartApp();
