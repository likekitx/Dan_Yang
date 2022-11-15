import { defineStore } from "pinia";

export const globalStore = defineStore('globalStore',{
    state: () => ({
        showWidth:document.documentElement.clientWidth,
        showHeight:document.documentElement.clientHeight,
        imgIconSrc:"https://likekit.cn/admin/publicImg/",
        videoSrc:"https://likekit.cn/admin/video/"
    }),
    persist: true,
})