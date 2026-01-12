import '@/styles/main.css'
// import '@/styles/inspection.scss';
// import '@/styles/alerts.scss';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadConfig } from '@/utils/request'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

// 在应用启动前加载配置
loadConfig().then(() => {
    const app = createApp(App);
    app.use(router)
    app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    app.mount('#app')
});
