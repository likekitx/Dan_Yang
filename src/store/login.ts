import { defineStore } from 'pinia'
import {User} from "@/utils/user/User";

export const useUser = defineStore({
    id: 'useUser',
    state: () => {
        return {
            isUser:false,
            token: '',
            User: {}
        }
    },
    actions: {
        setAuth(isUser:boolean){
            if(isUser){
                this.isUser = isUser;
            }else {
                this.isUser = false;
            }
        },
        setToken(token:string){
            if(token){
                this.token = token;
            }else {
                this.token = ''
            }
        },
        setUser(user:User){
            if(user){
                this.User = user;
            }else {
                this.User = {}
            }
        }
    },
})