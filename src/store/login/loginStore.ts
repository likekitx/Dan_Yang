/*
 * @Author: kitten 2721393058@qq.com
 * @Date: 2022-11-02 11:28:04
 * @LastEditors: kitten 2721393058@qq.com
 * @LastEditTime: 2022-11-14 21:33:54
 * @FilePath: \relinex\src\store\login\loginStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'

export const loginStore = defineStore({
    id: 'loginStore',
    state: () => {
        return {
            isUser:false,
            token: '',
            loginUserIndex:<USER.loginUserIndex>{},
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
        setLoginUserIndex(loginUserIndex:USER.loginUserIndex){
            if(loginUserIndex){
                this.loginUserIndex = loginUserIndex
            }
        }
    },
    persist: true,
})