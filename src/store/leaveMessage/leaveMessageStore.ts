import { defineStore } from "pinia";

export const leaveMessageStore = defineStore({
    id:'leaveMessage',
    state:()=>{
        return{
            leaveMessage:{}
        }
    },
    actions:{
        setLeaveMessage(leaveMessage:LEAVEMESSAGE.leaveMessage){
            this.leaveMessage = leaveMessage
        }
    },
    persist:true
})