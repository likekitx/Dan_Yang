import request from "@/api";

export const getUserTemMessage = (userId:string)=>{
    return request ({
        url: '/snow/user/getUserTem',
        method:'post',
        data:{
            userId:userId
        }
    })
}

export const getPersonal = (userId:string)=>{
    return request ({
        url: '/snow/user/getPersonal',
        method:'post',
        data:{
            userId:userId
        }
    })
}

export const register = (user: API.Register) => {
    return request.post<any,API.Response,API.Register>('/snow/user/reg',user)
}
export const registerOne = (regUex: API.RegUex) => {
    return request.post<any,API.Response,API.RegUex>('/snow/user/uex',regUex)
}

export const uploadImage = (param:FormData)=>{
    return request({
        url: '/snow/user/head',
        method:'post',
        data:{
            param:param
        }
    })
}
