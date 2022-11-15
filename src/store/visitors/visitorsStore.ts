import { defineStore } from "pinia";
import {VIDEO} from "@/api/utils/video";

export const visitorsStore = defineStore({
    id:"visitorsStore",
    state:()=>{
        return{
            visitorsList: [],
        }
    },
    actions:{
        setVisitorsList(visitorsList:VIDEO.videoPageIndex){
            if(visitorsList){
                this.visitorsList = visitorsList
            }else {
                this.visitorsList = {}
            }
        }
    },
    persist: true,
})