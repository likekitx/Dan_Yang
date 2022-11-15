import { defineStore } from "pinia";
import {VIDEO} from "@/api/utils/video";

export const videoStore = defineStore({
    id:"videoStore",
    state:()=>{
        return{
            videoPageIndex: {},
            videoPlayIndex: {},
            personalVideo: [],
            commentShowUser: 1,
        }
    },
    actions:{
        setVideoPageIndex(videoPageIndex:VIDEO.videoPageIndex){
            if(videoPageIndex){
                this.videoPageIndex = videoPageIndex
            }else {
                this.videoPageIndex = {}
            }
        },
        setVideoPlayIndex(videoPlayIndex:VIDEO.videoPlayIndex){
            if(videoPlayIndex){
                this.videoPlayIndex = videoPlayIndex
            }else {
                this.videoPlayIndex = {}
            }
        },
        setPersonalVideo(personalVideo: [] | null){
            if (personalVideo === null){
                this.personalVideo = []
            }else {
                this.personalVideo = personalVideo
            }
        },
        setCommentShowUser(commentShowUser: number){
            if (commentShowUser === null){
                this.commentShowUser = 1
            }else {
                this.commentShowUser = commentShowUser
            }
        },
    },
    persist: true,
})