/*
 * @Author: kitten 2721393058@qq.com
 * @Date: 2022-11-04 21:06:25
 * @LastEditors: kitten 2721393058@qq.com
 * @LastEditTime: 2022-11-07 20:50:42
 * @FilePath: \relinex\src\api\login\api.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare namespace API{
    interface Response<T = any>{
        data: T
    }   
    interface User{
        userHeadUrl:string
    }
    interface LoginMessage{
        userPhone:string,
        userPassword:string | any,
        loginIp:string | null,
        loginCity:string | null,
        loginBrowser:string,
        loginOs:string
    }
    interface RegUex{
        userPhone:string,
        loginIp:string | null,
        loginCity:string | null,
        loginBrowser:string,
        loginOs:string,
    }
    interface Register{
        userName: string,
        userSex: string,
        userPhone:string,
        userEmail: string,
        userBirthday: string,
        userAddress: string,
        userPassword: string,
        userNickname:string,
        userAbout: string,
    }
}