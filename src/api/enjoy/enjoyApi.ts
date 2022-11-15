import request from "@/api";

export const addEnjoy=(userId:string,videoId:string)=>{
    return request({
        url:"/snow/enjoy/addEnjoy",
        method: 'post',
        data:{
            userId:userId,
            videoId:videoId,
        }
    })
}

export const removeEnjoy=(userId:string,videoId:string)=>{
    return request({
        url:"/snow/enjoy/removeEnjoy",
        method: 'post',
        data:{
            userId:userId,
            videoId:videoId,
        }
    })
}

export const videoEnjoyHas=(userId:string,videoId:string)=>{
    return request({
        url:"/snow/enjoy/videoEnjoyHas",
        method: 'post',
        data:{
            userId:userId,
            videoId:videoId,
        }
    })
}
