/*
 * @Author: kitten 2721393058@qq.com
 * @Date: 2022-07-26 10:42:29
 * @LastEditors: kitten 2721393058@qq.com
 * @LastEditTime: 2022-11-14 17:18:57
 * @FilePath: \relinex\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElCollapseTransition } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import vue3videoPlay from "vue3-video-play";
import "vue3-video-play/dist/style.css";
import router from "./router";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
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