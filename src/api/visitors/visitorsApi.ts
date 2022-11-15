import request from "@/api";

export const getVisitors = (userId:string)=>{
    return request({
        url:'/snow/visitors/getVisitors',
        method:'post',
        data:{
            userId:userId
        }
    })
}

export const addVisitors = (userId:string,loginUserId:string)=>{
    return request({
        url:'/snow/visitors/addVisitors',
        method:'post',
        data:{
            userId:userId,
            loginUserId:loginUserId
        }
    })
}

