/*
 * @Author: kitten 2721393058@qq.com
 * @Date: 2022-07-26 11:59:06
 * @LastEditors: kitten 2721393058@qq.com
 * @LastEditTime: 2022-11-07 21:33:09
 * @FilePath: \relinex\src\api\login\loginStore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "../index";

export const getRsa = (userPhone:string) => {
    return request({
        url: '/snow/login/prs',
        method: 'post',
        params:{
            userPhone: userPhone
        }
    })
}
// export const login = (userPhone:string,userPassword:string | any,loginIp:string | null,
//     loginCity:string | null,loginBrowser:string,loginOs:string) => {
//     return request({
//         url: '/snow/login/ro',
//         method: 'post',
//         data: {
//             userPhone,userPassword,loginIp,loginCity,loginBrowser,loginOs
//         }
//     })
// }

export const login = (loginUser: API.LoginMessage) => {
    return request.post<any,API.Response,API.LoginMessage>('/snow/login/ro',loginUser)
}
export const loginOut = () => {
    return request({
        url: '/snow/login/lg',
        method: 'post'
    })
}
