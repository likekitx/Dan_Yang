<template>
  <div
      :style="[
            { width: iconWidth + 'px' },
            {backgroundImage:'url('+imgIconSrc+'commentIcon.png)'},
             {backgroundSize: '100%'}
            ]"
      @mouseenter="publicShow(1)"
      @mouseleave="publicOut"
      class="messageClass">
  </div>
  <el-card
      @mouseenter="publicShow(2)"
      @mouseleave="publicOut"
      :style="[
          {width: cardWidth + 'px' },
          {height: flag ? cardHeight + 'px' : '0'},
          {top: cardTop + 'px' },
          {display : disFlag ? 'flex' : 'none'}
      ]"
      class="visitor-card">
    <div
        :style="[{
          height: cardHead +'px'
        }]"
        class="cardHead">
      <span>评论</span>
    </div>
    <el-scrollbar
        noresize
        height="90%">
      <div
          :style="[
          {height: cardDivHeight + 'px'}
      ]"
          @click="clickLeaveMessage"
          @mouseleave="cardLeave"
          @mouseenter="cardOver(index)"
          :class="{backCardDiv: index === minIndex}"
          :key="index"
          v-for="(commentData,index) in commentList"
          class="cardDiv">
        <div
            :style="[{
          width: imgIconWidth + 'px',
          height:imgIconWidth + 'px'
        }]"
            @click="inIconPersonal(commentData.userId)"
            class="userIcon">
          <img :src="(commentData.userHeadImg)" alt="用户">
        </div>
        <div
            :style="[{
          width: imgRightDivWidth + 'px'
        }]"
            @click="inVideo(commentData.videoId)"
            class="userMessage">
          <span class="span1">{{commentData.userNickName}}</span>
          <span class="span2">{{getStrTen(commentData.commentIntroduce)}}</span>
          <span class="span3">{{commentData.commentTime}}</span>
        </div>
        <div
            :style="[
                {width: videoIconImgWidth + 'px'}
            ]"
            @click="inVideo(commentData.videoId)"
            class="videoImg">
          <video class="videoClass" :src="(commentData.videoUrl)"></video>
        </div>
      </div>
      <div class="notCommentClass">
        <span>暂时没有更多的评论</span>
      </div>
    </el-scrollbar>
  </el-card>
</template>
<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import { getStrTen } from '@/utils/utilsTool'
import { globalStore } from "@/store/global/global";
import { getUserCommentList } from '@/api/comment/commentApi'
import {storeToRefs} from "pinia";
import {loginStore} from "@/store/login/loginStore";
import {getPersonalMessage, loading} from "@/utils/user/userUtils";
import { useRouter } from "vue-router";
import {getVideoPageComment} from "@/api/video/videoApi";
import {addVisitors } from '@/api/visitors/visitorsApi'
import {videoStore} from "@/store/video/videoStore";
import { visitorsStore } from "@/store/visitors/visitorsStore";

const visitorsIn = visitorsStore()
const router = useRouter()
const videoPush = videoStore()
const { imgIconSrc,showWidth,showHeight } = storeToRefs(globalStore())
const { commentShowUser } = storeToRefs(videoStore())
const cardWidth = ref()
const cardHeight = ref()
const cardTop = ref()
const cardHead = ref()
const cardDivHeight = ref()
const { loginUserIndex } = storeToRefs(loginStore())
onMounted(()=>{

})
const minIndex = ref()
const cardOver = (index:number)=>{
  minIndex.value = index
}
const cardLeave = ()=>{
  minIndex.value = -1
}
//是否显示
const flag = ref(false)
const disFlag = ref(false)
let timeClear1:number,timeClear2:number;
const commentList = ref([])
const publicShow = (num:number) => {
  if(num===1){
    getUserCommentList(loginUserIndex.value.userId).then((res)=>{
      commentList.value = JSON.parse(res.data.data.commentUserList)
    })
  }
  clearTimeout(timeClear1)
  clearTimeout(timeClear2)
  disFlag.value = true
  setTimeout(function () {
    flag.value = true
  },10)
}
const inIconPersonal = (userId:string)=>{
  if(userId!==loginUserIndex.value.userId){
    addVisitors(userId,loginUserIndex.value.userId).then((res)=>{})
  }
  getPersonalMessage(userId)
  if (router.currentRoute._rawValue.path !== '/home/userIndex'){
    setTimeout(function () {
      router.push({
        name: "userIndex",
      })
    },300)
  }
}
const inVideo = (videoId:string,)=>{
  getVideoPageComment(videoId).then((res)=>{
    videoPush.setVideoPageIndex(JSON.parse(res.data.data.videoPageIndex))
    videoPush.setCommentShowUser(2)
    loading()
    setTimeout(function () {
      router.push({
        name: 'videoPlay'
      });
    },500)
  })
}
const publicOut = () => {
  timeClear1 = setTimeout(function () {
    flag.value = false
    timeClear2 = setTimeout(function () {
      disFlag.value = false
    },400)
  },100)
}
const iconWidth = ref()
const imgIconWidth = ref()
const imgRightDivWidth = ref()
const videoIconImgWidth = ref()
onBeforeMount(()=>{
  cardWidth.value = showWidth.value * 0.21
  cardHeight.value = showHeight.value * 0.7
  cardTop.value = showHeight.value * 0.06
  cardHead.value = cardHeight.value * 0.1 - 2
  cardDivHeight.value = showHeight.value * 0.1
  iconWidth.value = showHeight.value * 0.055
  imgIconWidth.value = cardWidth.value * 0.166
  imgRightDivWidth.value = cardWidth.value * 0.53 - 10
  videoIconImgWidth.value = cardWidth.value * 0.3
})
</script>

<style scoped>
.messageClass{
  width: 16.8%;
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
  border: 1px solid #f1ecec;
  background-position: center center;
  background-repeat: no-repeat;
}
img{
  width: 50px;
  height: 50px;
}
.visitor-card{
  z-index: 4;
  background-color: white;
  position: absolute;
  transition: height 0.4s;
  right: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6f6d6d;
  font-weight: bold;
  font-family: KaiTi,sans-serif;
  box-shadow: 0 0 5px 1px #999;
}
.cardHead{
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-items: left;
  align-items: center;
  padding-left: 5%;
  font-size: 22px;
  cursor: default;
  border-bottom: 2px solid #939393;
}
:deep(.el-card__header){
  width: 100%;
  height: v-bind(cardHead+'px');
  transition: height 0.3s;
  padding: 0;
  border-bottom: 2px solid #939393;
}
:deep(.el-card__body){
  width: 100%;
  height: 100%;
  padding: 0;
}
.cardDiv{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  cursor: pointer;
  /*border: 1px solid black;*/
}
.cardDiv:first-child{
  padding-top: 5px;
}
.userIcon{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.userIcon img{
  width: 90%;
  height: 90%;
  border-radius: 50%;
}
.userMessage{
  display: flex;
  padding-left: 10px;
  margin-top: 8px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 16px;
  /*border: 1px solid black;*/
}
.span3{
  font-size: 14px;
  margin: 0 auto;
  /*border: 1px solid black;*/
}
.span1{
  width: 50%;
  display: flex;
  font-size: 17px;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  /*border: 1px solid black;*/
}
.span2{
  width: 90%;
  margin: 4px 0;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  text-align: left;
}
.backCardDiv{
  background-color: #e3e1e1;
}
.notCommentClass{
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.notLeaveClass span{
  font-size: 16px;
  margin: 0;
}
.videoImg{
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #bababa;
  border-radius: 8px;
}
.videoClass{
  width: 100%;
  height: 100%;
}
</style>