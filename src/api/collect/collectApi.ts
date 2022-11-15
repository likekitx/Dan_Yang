import request from "@/api";

export const addCollect=(userId:string,videoId:string)=>{
    return request({
        url:"/snow/collect/addCollect",
        method: 'post',
        data:{
            userId:userId,
            videoId:videoId,
        }
    })
}

export const removeCollect=(userId:string,videoId:string)=>{
    return request({
        url:"/snow/collect/removeCollect",
        method: 'post',
        data:{
            userId:userId,
            videoId:videoId,
        }
    })
}

export const videoCollectHas=(userId:string,videoId:string)=>{
    return request({
        url:"/snow/collect/videoCollectHas",
        method: 'post',
        data:{
            userId:userId,
            videoId:videoId,
        }
    })
}