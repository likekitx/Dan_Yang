import request from "@/api";

export const getLeaveMessage = (userId:string)=>{
    return request({
        url:'/snow/leaveMessage/getLeaveMessage',
        method:'post',
        data:{
            userId:userId
        }
    })
}

export const addLeave = (leaveId:string,userId:string,message:string)=>{
    return request({
        url:'/snow/leaveMessage/addLeave',
        method:'post',
        data:{
            leaveId:leaveId,
            userId:userId,
            message:message
        }
    })
}