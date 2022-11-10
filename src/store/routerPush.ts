import { defineStore } from "pinia";

export const routerPush = defineStore({
    id:'routerPush',
    state:()=>{
        return{
            videoUrl:''
        }
    },
    actions:{
        setVideoUrl(videoUrl:string){
            if(videoUrl){
                this.videoUrl = videoUrl
            }else {
                this.videoUrl = ''
            }
        }
    }
})