import { defineStore } from "pinia";

export const userStore = defineStore({
    id: 'userStore',
    state:()=>{
        return {
            personalMessage: {},
            userTemMessage: {},
            personalNumber:1
        }
    },
    actions:{
        setPersonalMessage(personal:USER.personal | null){
            if (personal === null){
                this.personalMessage = ''
            }else {
                this.personalMessage = personal
            }
        },
        setUserTemMessage(userTemMessage:USER.userTemMessage){
            this.userTemMessage = userTemMessage
        },
        setPersonalNumber(number:number){
            this.personalNumber = number
        }
    },
    persist: true,
})