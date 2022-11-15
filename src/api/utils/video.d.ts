import {getNowTime} from "@/utils/utilsTool";

declare namespace VIDEO{
    interface videoPageIndex{
        videoId:string,
        userNickName:string;
        videoCoverUrl:string;
        videoUrl:string;
        videoCreateTime:any;
        videoIntroduce:string;
    }
    interface videoPlayIndex{
        videoName:string;
        userReline:string;
        userId:string;
        userNickName:string;
        userHeadImg:string;
        videoCollect:string;
        videoLike:string;
        // userId:string;
        commentCount:string;
        // videoDeleteTime:any;
        // videoUpdateTime:any;
        // videoVersion:number;
        // videoDeleted:number;
        videoClassify:string;
        videoPlayCount:string;
    }
    interface VideoComment{
        userId:string
        userHeadImg:string
        userNickName: string
        commentIntroduce:string
        commentTime: string
        userAddress: string
    }
    interface personalVideo{
        videoId:string
        videoIntroduce:string
        videoLikeCount:string
        videoUrl:string
    }
}