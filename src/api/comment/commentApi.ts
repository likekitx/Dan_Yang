import request from "@/api";


export const userComment = (commentContent:string,videoId:string,commentUserId:string,userId:string)=>{
    return request({
        url:"/snow/comment/userComment",
        method: 'post',
        data:{
            commentContent:commentContent,
            videoId:videoId,
            commentUserId:commentUserId,
            userId:userId,
        }
    })
}

export const getComment = (videoId:string)=>{
    return request({
        url:"/snow/comment/getComment",
        method: 'post',
        data:{
            videoId:videoId
        }
    })
}

export const getUserCommentList = (userId:string)=>{
    return request({
        url:"/snow/comment/getUserCommentList",
        method: 'post',
        data:{
            userId:userId
        }
    })
}