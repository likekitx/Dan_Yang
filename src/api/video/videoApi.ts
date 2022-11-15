import request from "@/api";

export const requestHomeVideo = ()=>{
    return request.post("/snow/video/homeVideo")
}

export const requestVideoPlayIndex = (videoId:string)=>{
    return request({
        url:"/snow/video/videoPlayIndex",
        method: 'post',
        data:{
            videoId:videoId
        }
    })
}

export const getVideoPageComment = (videoId:string)=>{
    return request({
        url:"/snow/video/getVideoPageComment",
        method: 'post',
        data:{
            videoId:videoId
        }
    })
}



export const getUserVideo = (userId:string)=>{
    return request({
        url:'/snow/video/getUserVideo',
        method:'post',
        data:{
            userId:userId
        }
    })
}

export const getUserVideoLike = (userId:string)=>{
    return request({
        url:'/snow/video/getUserVideoLike',
        method:'post',
        data:{
            userId:userId
        }
    })
}
export const getUserVideoCollect = (userId:string)=>{
    return request({
        url:'/snow/video/getUserVideoCollect',
        method:'post',
        data:{
            userId:userId
        }
    })
}
export const getUserVideoHistory = (userId:string)=>{
    return request({
        url:'/snow/video/getUserVideoHistory',
        method:'post',
        data:{
            userId:userId
        }
    })
}