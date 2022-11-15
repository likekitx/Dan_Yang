import {ElLoading} from "element-plus";
import {getPersonal} from "@/api/userApi/userApi";
import {getUserVideo} from "@/api/video/videoApi";
import {userStore} from "@/store/user/userStore";
import {videoStore} from "@/store/video/videoStore";

const userPinia = userStore()
const videoMethod = videoStore()
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
export const getPersonalMessage = (userId:string)=>{
    const loading = ElLoading.service({
        lock: true,
        text: '王雪亲亲，正在加载请稍等!',
        background: 'rgb(255,255,255)',
        spinner:svg,
        svgViewBox:'-10 -10 50 50'
    })
    setTimeout(function (){
        getPersonal(userId).then((res)=>{
            userPinia.setPersonalMessage(JSON.parse(res.data.data.personal));
        });
        getUserVideo(userId).then((res)=>{
            videoMethod.setPersonalVideo(JSON.parse(res.data.data.personalVideoList));
        })
        loading.close()
    },500)
}

export const loading = ()=>{
    const loading = ElLoading.service({
        lock: true,
        text: '王雪亲亲，正在加载请稍等!',
        background: 'rgba(255,255,255,1)',
        spinner:svg,
        svgViewBox:'-10 -10 50 50'
    })
    setTimeout(function (){
        loading.close()
    },500)
}