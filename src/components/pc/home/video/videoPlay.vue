<template>
  <div class="backOut">
    <div
        :style="[
            {width: flagComment ? outWidthLong + 'px' : outWidthShort + 'px'}
            ]"
        class="outClass">
      <div
          class="indexClass">
        <vue3VideoPlay
            :="options"
            :src="(videoPageIndex.videoUrl)"
        />
      </div>
      <div class="titleClass">
        <span>{{ videoPlayIndexMessage.videoName }}</span>
        <span>reline号：{{videoPlayIndexMessage.userReline}}</span>
      </div>
      <div class="messageClass">
        <span>@{{ videoPlayIndexMessage.userNickName }}</span>
        <span>{{ videoPageIndex.videoIntroduce }}</span>
      </div>
      <div
          :style="[{width: userButWidth + 'px'}]"
          class="userButton">
        <div
            @click="userIndexMessage(videoPlayIndexMessage.userId)"
            class="userButtonDiv1">
          <img :src="(videoPlayIndexMessage.userHeadImg)" alt="用户"/>
        </div>
        <div class="userButtonDiv">
          <div
              @click="userLikeVideo"
              class="likeIcon">
            <i :style="[{color: ifLike ? 'red' : 'white'}]" class="iconfont icon-likeIconlikeIcon"></i>
          </div>
          <span>{{subNumber(videoPlayIndexMessage.videoLike)}}</span>
        </div>
        <div class="userButtonDiv">
          <div
              @click="userCollectVideo"
              class="likeIcon">
            <i :style="[{color: ifCollect ? '#fddd10' : 'white'}]" class="iconfont icon-likeIconcollecticon"></i>
          </div>
          <span>{{ subNumber(videoPlayIndexMessage.videoCollect) }}</span>
        </div>
        <div
            class="userButtonDiv"
            @click="clickComment(videoPlayIndexMessage.commentCount)">
          <div
              @click="ifComment = !ifComment"
              class="likeIcon">
            <i :style="[{color: ifComment ? '#e58fac' : 'white'}]" class="iconfont icon-likeIconcommentIcon"></i>
          </div>
          <span>{{ subNumber(videoPlayIndexMessage.commentCount) }}</span>
        </div>
      </div>
    </div>
    <div
        :style="[
            {width: flagComment ? '0' : commentWidth + 'px'}
            ]"
        class="commentClass">
    <span :style="[
        {width: commentSpanWidth + 'px'}
    ]">全部评论({{ subNumber(videoPlayIndexMessage.commentCount) }})</span>
      <el-scrollbar
          noresize
          height="100%">
        <el-card
            :style="[
            {width: commentWidth + 'px'}
          ]"
            class="comment-card">
          <div
              class="cardDataDiv"
              :key="index"
              @click="userIndexMessage(commentData.userId)"
              v-for="(commentData,index) in commentMessage">
            <div
                :style="[{width: userButWidth + 'px'}]"
                class="userIcon">
              <img :src="(commentData.userHeadImg)" alt="用户">
            </div>
            <div class="userMessage">
              <span>{{commentData.userNickName}}</span>
              <span>{{commentData.commentIntroduce}}</span>
              <span>{{commentData.commentTime}}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                {{commentData.userAddress}}</span>
            </div>
          </div>
          <div class="notCommentClass">
            <span>暂时没有更多的评论</span>
          </div>
        </el-card>
      </el-scrollbar>
      <div class="userComment">
        <el-input
            class="userCommentInput"
            v-model="userCommentInput"
            type="string"
            maxlength="89"
            minlength="1"
            :size="30"
            placeholder="留下您精彩的评论吧">
          <template #append>
            <div
                class="commentAppend"
                @mousedown="iconSize = !iconSize"
                @mouseup="iconSize = !iconSize"
              @click="">
              <!--                @click="sendComment(videoPageIndex.videoId,loginUserIndex.userId,videoPlayIndexMessage.userId)">-->
              <el-icon
                  style="transition: 0.1s"
                  :size="(iconSize ? 30 : 35)"
                  :color= "iconSize ? 'white' : '#c586f2'"><Position /></el-icon>
            </div>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted,onBeforeMount, reactive, ref,watch} from "vue";
import {storeToRefs} from "pinia";
import {globalStore} from "@/store/global/global";
import { videoStore } from "@/store/video/videoStore";
import { userStore } from "@/store/user/userStore";
import { loginStore } from "@/store/login/loginStore";
import { subNumber } from '@/utils/utilsTool'
import { requestVideoPlayIndex,getUserVideo } from '@/api/video/videoApi'
import {addEnjoy,removeEnjoy,videoEnjoyHas } from '@/api/enjoy/enjoyApi'
import {addCollect,removeCollect,videoCollectHas } from '@/api/collect/collectApi'
import {addVisitors } from '@/api/visitors/visitorsApi'
import {getPersonal} from '@/api/userApi/userApi'
import { userComment,getComment } from '@/api/comment/commentApi'
import { useRouter } from "vue-router";
import {ElLoading, ElMessage, ElNotification} from "element-plus";
import { getNowTime } from '@/utils/utilsTool'
import {VIDEO} from "@/api/utils/video";
import {getPersonalMessage} from "@/utils/user/userUtils";
import {visitorsStore} from "@/store/visitors/visitorsStore";

const visitorsIn = visitorsStore()
const router = useRouter()
const { loginUserIndex } = storeToRefs(loginStore())
const { videoPageIndex,commentShowUser } = storeToRefs(videoStore())
const setMethod = videoStore()
const userPinia = userStore()

const { showWidth } = storeToRefs(globalStore())
const commentSpanWidth = ref()
const outWidthLong = ref()
const outWidthShort = ref()
let commentWidth = ref()
const ifLike = ref(false)
const ifCollect = ref(false)
const ifComment = ref(false)
const iconSize = ref(true)
const flagComment = ref(true)
const userCommentInput = ref('')
const videoPlayIndexMessage = ref({})
onMounted(()=>{
  requestVideoPlayIndex(videoPageIndex.value.videoId).then((res)=>{
    videoPlayIndexMessage.value = JSON.parse(res.data.data.videoPlayIndex)
    setMethod.setVideoPlayIndex(JSON.parse(res.data.data.videoPlayIndex));
  })
})
const commentMessage = ref<VIDEO.VideoComment[]>([])
const clickComment = (commentCount:string)=>{
  if(parseInt(commentCount) !== 0){
    getComment(videoPageIndex.value.videoId).then((res)=>{
      commentMessage.value = JSON.parse(res.data.data.comment)
    })
  }
  flagComment.value = !flagComment.value
}
const userLikeVideo = ()=>{
  if(ifLike.value == false){
    videoPlayIndexMessage.value.videoLike = (parseInt(videoPlayIndexMessage.value.videoLike) + 1) + ''
    addEnjoy(loginUserIndex.value.userId,videoPageIndex.value.videoId).then((res)=>{
      if(res.data.code === 20000){
        ifLike.value = true
      }else {
        ElMessage({
          showClose: true,
          message: "点赞失败,请重试!",
          type: 'error'
        })
      }
    })
  }else {
    videoPlayIndexMessage.value.videoLike = parseInt(videoPlayIndexMessage.value.videoLike) - 1 + ''
    removeEnjoy(loginUserIndex.value.userId,videoPageIndex.value.videoId).then((res)=>{
      if(res.data.code === 20000){
        ifLike.value = false
      }else {
        ElMessage({
          showClose: true,
          message: "取消点赞失败,请重试!",
          type: 'error'
        })
      }
    })
  }
}
watch(commentShowUser, async (newQuestion, oldQuestion) => {
  if(newQuestion===2){
    clickComment(videoPlayIndexMessage.value.commentCount)
    flagComment.value = false
    setMethod.setCommentShowUser(1)
  }
})
const userCollectVideo = ()=>{
  if(ifCollect.value == false){
    videoPlayIndexMessage.value.videoCollect = (parseInt(videoPlayIndexMessage.value.videoCollect) + 1) + ''
    addCollect(loginUserIndex.value.userId,videoPageIndex.value.videoId).then((res)=>{
      if(res.data.code === 20000){
        ifCollect.value = true
      }else {
        ElMessage({
          showClose: true,
          message: "收藏失败,请重试!",
          type: 'error'
        })
      }
    })
  }else {
    videoPlayIndexMessage.value.videoCollect = (parseInt(videoPlayIndexMessage.value.videoCollect) - 1 ) + ''
    removeCollect(loginUserIndex.value.userId,videoPageIndex.value.videoId).then((res)=>{
      if(res.data.code === 20000){
        ifCollect.value = false
      }else {
        ElMessage({
          showClose: true,
          message: "取消收藏失败,请重试!",
          type: 'error'
        })
      }
    })
  }
}
const sendComment = (videoId:string,commentUserId:string,userId:string)=>{
  userComment(userCommentInput.value,videoId,commentUserId,userId).then((res)=>{
    if(res.data.code === 20000){
      videoPlayIndexMessage.value.commentCount = (parseInt(videoPlayIndexMessage.value.commentCount) + 1) + ''
      commentMessage.value.unshift({
        userHeadImg:loginUserIndex.value.userHeadImg,
        userNickName: loginUserIndex.value.userNickName,
        commentIntroduce:userCommentInput.value,
        commentTime: getNowTime(),
        userAddress: loginUserIndex.value.userAddress
      })
      ElNotification({
        title: '评论',
        message: "评论成功",
        type: 'success',
        duration:2000
      })
      userCommentInput.value = ''
    }else {
      ElMessage({
        showClose: true,
        message: "评论失败",
        type: 'error'
      })
    }
  })
}
const userButWidth = ref()
onBeforeMount(()=>{
  outWidthLong.value = showWidth.value * 0.874
  outWidthShort.value = outWidthLong.value * 0.8
  commentWidth.value = outWidthLong.value * 0.2
  commentSpanWidth.value = commentWidth.value * 0.92
  userButWidth.value = outWidthLong.value * 0.033
  videoEnjoyHas(loginUserIndex.value.userId,videoPageIndex.value.videoId).then((res)=>{
    if(res.data.code === 20000){
      ifLike.value = true
    }
  })
  videoCollectHas(loginUserIndex.value.userId,videoPageIndex.value.videoId).then((res)=>{
    if(res.data.code === 20000){
      ifCollect.value = true
    }
  })
})
const userIndexMessage = (userId:string)=>{
  if(userId!==loginUserIndex.value.userId){
    addVisitors(userId,loginUserIndex.value.userId).then((res)=>{})
  }
  getPersonalMessage(userId);
  userPinia.setPersonalNumber(1)
  setTimeout(function () {
    router.push({
      name: "userIndex",
    })
  },300)
}
const options = reactive({
  width: "100%",
  height: "100%",
  color: "#409eff",
  title: "title",
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0","3.0","5.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: true, //循环播放
  mirror: false, //镜像画面
  lightOff: false, //关灯模式
  volume: 0.5, //默认音量大小
  spend:true,
// poster:"",//封面
  currentTime: 0,
  preload:'meta',//预加载
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});
</script>

<style scoped>
.backOut{
  position: absolute;
  background-color: #0f0f1a;
  width: 87.4%;
  top: 8.5%;
  left: 11%;
  height: 90.8%;
}
.outClass{
  position: absolute;
  left: 0;
  height: 100%;
  background-color: #0f0f1a;
  z-index: 1;
  transition: 0.5s cubic-bezier(0.32, 0.88, 0.54, 1);
}
.indexClass{
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: 0;
  /*border: 1px solid black;*/
}
:deep(.d-player-video-main){
  transition: 0.5s cubic-bezier(0.32, 0.88, 0.54, 1);
}
.commentClass{
  position: absolute;
  height: 100%;
  right: 0;
  background-color: #20212c;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  transition: 0.5s cubic-bezier(0.32, 0.88, 0.54, 1);
  z-index: 1;
}
.commentClass span{
  height: 7%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-left: 8%;
  font-size: 20px;
  font-weight: bold;
  color: white;
  font-family: STFangsong, sans-serif;
}
:deep(.el-scrollbar){
  width: 100%;
}
.comment-card{
  height: 90%;
  border-radius: 0;
  border: none;
  color: white;
  background-color: #20212c;
}
.cardDataDiv{
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  /*border: 1px solid red;*/
}
.userIcon{
  height: 60%;
  margin-left: 4%;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  /*border: 1px solid red;*/
}
.userIcon img{
  width: 100%;
  height: 100%;
}
.userMessage{
  width: 80.3%;
  height: 86%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /*border: 1px solid red;*/
}
.userMessage span{
  font-size: 16px;
  width: 100%;
  height: 20%;
}
.userMessage span:nth-child(1){
  font-size: 15px;
}
.userMessage span:nth-child(3){
  font-size: 13px;
}
.titleClass{
  position: absolute;
  top: 1%;
  left: 1%;
  width: 30%;
  height: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  color: white;
  font-size: 20px;
  font-weight: bold;
  font-family: STXinwei,serif;
}
.messageClass{
  position: absolute;
  top: 83%;
  left: 1%;
  width: 86%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  color: white;
  font-size: 22px;
  font-weight: bold;
  font-family: STKaiti,serif;
}
.messageClass span:first-child{
  font-size: 26px;
}
.messageClass span:nth-child(2){
  margin-left: 6px;
}
.userButton{
  z-index: 2;
  position: absolute;
  top: 42%;
  height: 40%;
  right: 1%;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-family: “Microsoft YaHei”,sans-serif;
  color: white;
  font-weight: bold;
}
.userButtonDiv1{
  z-index: 3;
  cursor: pointer;
  width: 100%;
  height: 16.3%;
  border-radius: 50%;
  overflow: hidden;
}
.userButtonDiv1 img{
  width: 100%;
  height: 100%;
}
.userButtonDiv{
  z-index: 3;
  cursor: pointer;
  width: 100%;
  height: 22.3%;
}
.userButtonDiv span{
  width: 100%;
  height: 26%;
}
.likeIcon{
  width: 100%;
  height: 74%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}
.userComment{
  width: 100%;
  height: 6%;
  position: absolute;
  bottom: 0;
}
.userCommentInput{
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: white;
  background-color: #20212c;
}
.commentAppend{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-family:Arial,Helvetica,sans-serif;
  cursor: pointer;
}
:deep(.el-input__wrapper){
  background-color: #20212c;
  box-shadow: 1px 0 0 1px #383836;
}
:deep(.el-input__inner){
  color: white;
}
:deep(.el-input-group__append){
  width: 20%;
  padding: 0;
  background-color: #20212c;
  box-shadow: 1px 0 0 1px #383836;
}
@font-face {
  font-family: "iconfont"; /* Project id 3767224 */
  src: url('//at.alicdn.com/t/c/font_3767224_qjl7jmp2d2.woff2?t=1668267882066') format('woff2'),
  url('//at.alicdn.com/t/c/font_3767224_qjl7jmp2d2.woff?t=1668267882066') format('woff'),
  url('//at.alicdn.com/t/c/font_3767224_qjl7jmp2d2.ttf?t=1668267882066') format('truetype'),
  url('//at.alicdn.com/t/c/font_3767224_qjl7jmp2d2.svg?t=1668267882066#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 46px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-likeIconcommentIcon:before {
  content: "\e63f";
}

.icon-likeIconcollecticon:before {
  content: "\e8c6";
}

.icon-likeIconlikeIcon:before {
  content: "\e601";
}
.notCommentClass{
  width: 100%;
  height: 100%;
  margin-top: 2%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.notCommentClass span{
  font-size: 18px;
  margin: 0;
}
</style>