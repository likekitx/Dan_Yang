import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElCollapseTransition } from 'element-plus'
import 'element-plus/theme-chalk/base.css'

import vue3videoPlay from "vue3-video-play";
import "vue3-video-play/dist/style.css";

import router from "./router";

import { createPinia } from "pinia";

const pinia = createPinia()

const app = createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(vue3videoPlay)
app.use(router)
app.use(pinia)
app.mount('#app')