<template>
  <div class="userTemClass">
    <visitor/>
    <message/>
    <leaveMessage/>
    <div
        :style="[
            {backgroundImage:'url('+imgIconSrc+'longLineIcon.png)'}
        ]"
        class="sxClass"></div>
    <div
        @mouseenter="leaveIn"
        @mouseleave="leaveOut"
        element-loading-svg-view-box="-10, -10, 50, 50"
        @click="onUser(loginUserIndex.userId)"
        :style="[
            { width: iconWidth + 'px' },
            {backgroundImage: 'url('+loginUserIndex.userHeadImg+')'},
             {backgroundSize: '100%'}
            ]"
        class="userClass custom-loading-svg">
    </div>
  </div>
  <div
      @mouseenter="leaveIn"
      @mouseleave="leaveOut"
      :style="[
          { height : flag ? '17%' : '0' }
        ]"
      class="userTemOut">
    <div
        :style="[{display: outFlag ? 'block' : 'none'}]"
        class="topTopPadding">
      <div class="publicUserTemTop">
        <div
            @click="myVideo(1)"
            class="divLikeClass">
          <div
              :style="[
              {backgroundImage: 'url('+imgIconSrc+'myVideoIcon.png'+')'}
              ]"
              class="divImgClass">
          </div>
          <span>{{subNumber(userTemMessage.userVideoCount)}}</span>
          <span>我的作品</span>
        </div>
        <div
            @click="myVideo(2)"
            class="divLikeClass">
          <div
              :style="[
              {backgroundImage: 'url('+imgIconSrc+'likeIcon.png'+')'}
              ]"
              class="divImgClass">
          </div>
          <span>{{subNumber(userTemMessage.userVideoLike)}}</span>
          <span>我的喜欢</span>
        </div>
        <div
            @click="myVideo(3)"
            class="divLikeClass">
          <div
              :style="[
              {backgroundImage: 'url('+imgIconSrc+'collectIconYellow.png'+')'}
              ]"
              class="divImgClass">
          </div>
          <span>{{subNumber(userTemMessage.userVideoCollect) }}</span>
          <span>我的收藏</span>
        </div>
        <div
            @click="myVideo(4)"
            class="divLikeClass">
          <divq
              :style="[
              {backgroundImage: 'url('+imgIconSrc+'historyIcon.png'+')'}
              ]"
              class="divImgClass">
          </divq>
          <span>{{subNumber(userTemMessage.userVideoHistory) }}</span>
          <span>浏览历史</span>
        </div>
      </div>
      <div class="divOut">
        <span @click="onUser(loginUserIndex.userId)">个人主页</span>
        <span @click="userLoginOut">退出登陆</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import visitor from './visitor/visitor.vue'
import message from './comment/comment.vue'
import leaveMessage from './leaveMessage/leaveMessage.vue'
import { globalStore } from "@/store/global/global";
import {storeToRefs} from "pinia";
import {onBeforeMount, ref} from "vue";
import {getPersonal, getUserTemMessage} from '@/api/userApi/userApi'
import {getUserVideo} from '@/api/video/videoApi'
//路由点击头像跳转
import { useRouter } from 'vue-router'
import {loginOut} from "@/api/login/loginApi";
import {ElLoading, ElMessage, ElNotification} from "element-plus";
import {loginStore} from "@/store/login/loginStore";
import {videoStore} from "@/store/video/videoStore";
import { subNumber } from '@/utils/utilsTool'
import {userStore} from "@/store/user/userStore";
import {getPersonalMessage} from "@/utils/user/userUtils";
const { loginUserIndex } = storeToRefs(loginStore())
const { imgIconSrc,showHeight } = storeToRefs(globalStore())
const router = useRouter()
const userPinia = userStore()
const onUser = (userId:string) => {
  getPersonalMessage(userId)
  userPinia.setPersonalNumber(1)
  if (router.currentRoute._rawValue.path !== '/home/userIndex'){
    setTimeout(function () {
      router.push({
        name: "userIndex",
      })
    },300)
  }
}
const iconWidth = ref()
onBeforeMount(()=>{
  iconWidth.value = showHeight.value * 0.055
})
const myVideo=(number:number)=>{
  if (router.currentRoute._rawValue.path !== '/home/userIndex'){
    router.push({
      name:"userIndex"
    })
  }
  userPinia.setPersonalNumber(number)
}
//是否显示
const flag = ref(false)
const outFlag = ref(false)
let setTime1: number,setTime2: number;
const leaveOut = ()=>{
  setTime1 = setTimeout(function (){
    flag.value = false
    setTime2 = setTimeout(function () {
      outFlag.value = false
    },150)
  },100)
}
const userTemMethod = userStore()
const userTemMessage = ref({})
const leaveIn = ()=>{
  getUserTemMessage(loginUserIndex.value.userId).then((res)=>{
    userTemMessage.value = JSON.parse(res.data.data.userTemMessage)
    userTemMethod.setUserTemMessage(JSON.parse(res.data.data.userTemMessage))
  })
  clearTimeout(setTime1);
  clearTimeout(setTime2);
  outFlag.value = true
  flag.value = true
}

const userLoginOut = ()=>{
  loginOut().then((res)=>{
    console.log(res);
    if(res.data.code === 20000){
      localStorage.removeItem("token")
      ElNotification({
        title: '退出登陆',
        message: "您已退出登录",
        type: 'success',
        duration:1000
      })
      setTimeout(function () {
        router.push({name:'login'});
      },1000)
    }
  })
}
</script>

<style scoped>
.userTemClass{
  /*border: 1px solid black;*/
  position: absolute;
  width: 16%;
  height: 5.5%;
  right: 1.6%;
  top: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.sxClass{
  width: 15%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.userClass{
  height: 100%;
  border-radius: 50%;
  background-color: #ededef;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
}
.userTemOut{
  position: absolute;
  top: 7.5%;
  right: 1.6%;
  width: 18%;
  z-index: 4;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.16, 0.97, 0.22, 1.18);
}
.topTopPadding{
  position: absolute;
  width: 100%;
  /*border: 1px solid black;*/
  height: 100%;
  overflow: hidden;
  border-radius: 7px;
  box-shadow: 0 0 5px 1px #999;
}
.publicUserTemTop{
  border-radius: 7px 7px 0 0;
  /*border: 1px solid black;*/
  background-color: white;
  width: 100%;
  height: 74%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.divLikeClass {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  font-size: 15px;
  cursor: pointer;
  height: 100%;
  color: #615e5e;
}
.divLikeClass:hover{
  color: #000000;
}
.divLikeClass:hover .divImgClass{
  background-size: 95%;
}
.divImgClass{
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  width: 74%;
  height: 70%;
}
.divOut{
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  height: 26%;
  width: 100%;
  border-radius: 0 0 7px 7px;
}
.divOut span{
  display: inline-flex;
  /*border: 1px solid black;*/
  color: #585353;
  -webkit-font-smoothing:none;
  justify-content: center;
  align-items: center;
  width: 45%;
  font-size: 15px;
  height: 25px;
  cursor: pointer;
  border-radius: 15px;
  border: 1px solid #c6c3c3;
  font-family: “Microsoft YaHei”,sans-serif;
}
.divOut span:hover{
  color: #1296db;
  border: 1px solid #1296db;
}
</style>