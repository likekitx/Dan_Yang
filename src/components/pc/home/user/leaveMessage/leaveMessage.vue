<template>
  <div
      :style="[
            { width: iconWidth + 'px' },
            {backgroundImage:'url('+imgIconSrc+'leaveMessageIcon.png)'},
             {backgroundSize: '100%'}
            ]"
      @mouseenter="publicShow(1)"
      @mouseleave="publicOut"
      class="leaveMessageClass">
  </div>
  <el-card
      @mouseenter="publicShow(2)"
      @mouseleave="publicOut"
      v-show = disFlag
      :style="[
        {width: cardWidth + 'px' },
        {height: flag ? cardHeight + 'px' : '0'},
        {top: cardTop + 'px' },
    ]"
      class="visitor-card">
      <div
          :style="[{
            height: cardHead +'px'
          }]"
          class="cardHead">
        <span>留言</span>
      </div>
    <el-scrollbar
        height="90%"
        noresize>
      <div
          :style="[
            {height: cardDivHeight + 'px'}
        ]"
          @click="clickLeaveMessage"
          @mouseleave="cardLeave"
          @mouseenter="cardOver(index)"
          :class="{backCardDiv: index === minIndex}"
          :key="index"
          v-for="(commentData,index) in leaveMess"
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
            @click="rightLeaveMessage(commentData)"
            class="userMessage">
          <span
              class="span1">{{commentData.userNickName}}</span>
          <span
              class="span2">{{getStrTen(commentData.leaveContent)}}</span>
          <div>
            <span class="span3">{{commentData.leaveTime}}</span>
          </div>
        </div>
      </div>
      <div class="notLeaveClass">
        <span>暂时没有更多的留言</span>
      </div>
    </el-scrollbar>
  </el-card>
  <el-drawer v-model="drawer" :with-header="false">
    <div
        @click="inIconPersonal(messageLeave.userId)"
        class="drawerDiv1">
      <span>{{messageLeave.userNickName}}</span>
    </div>
    <div class="drawerDiv">
      <div
          @click="inIconPersonal(messageLeave.userId)"
          class="imgHeadDrawer">
        <img :src="messageLeave.userHeadImg" alt="头像">
      </div>
      <div class="rightDrawerDiv">
        <span>{{ messageLeave.leaveContent }}</span>
      </div>
    </div>
    <div class="drawerDiv3">
      <span>{{messageLeave.leaveTime}}</span>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";

import { globalStore } from "@/store/global/global";
import { loginStore } from "@/store/login/loginStore";
import { leaveMessageStore } from "@/store/leaveMessage/leaveMessageStore";
import { visitorsStore } from "@/store/visitors/visitorsStore";
import {addVisitors } from '@/api/visitors/visitorsApi'

import {storeToRefs} from "pinia";
import {getLeaveMessage} from "@/api/leaveMessage/leaveMessageApi";
import { getStrTen } from "@/utils/utilsTool";
import { getPersonalMessage } from "@/utils/user/userUtils";
import { useRouter } from "vue-router";
import {a} from "pinia-plugin-persistedstate/dist/types-47036483";

const drawer = ref(false)
const visitorsIn = visitorsStore()

const { imgIconSrc,showWidth,showHeight } = storeToRefs(globalStore())
const { loginUserIndex } = storeToRefs(loginStore())
const leaveStore = leaveMessageStore()
const router = useRouter()
const cardWidth = ref()
const cardHeight = ref()
const cardTop = ref()
const cardHead = ref()
const cardDivHeight = ref()
const imgIconWidth = ref()
const imgRightDivWidth = ref()
onMounted(()=>{

})
const inIconPersonal = (userId:string)=>{
  if(userId!==loginUserIndex.value.userId) {
    addVisitors(userId, loginUserIndex.value.userId).then((res) => {})
  }
  getPersonalMessage(userId)
  if (router.currentRoute._rawValue.path !== '/home/userIndex'){
    setTimeout(function () {
      router.push({
        name: "userIndex",
      })
    },300)
  }
  drawer.value = false
}
const iconWidth = ref()
onBeforeMount(()=>{
  cardWidth.value = showWidth.value * 0.16
  cardHeight.value = showHeight.value * 0.6
  cardTop.value = showHeight.value * 0.06
  cardHead.value = cardHeight.value * 0.1 - 2
  cardDivHeight.value = showHeight.value * 0.07
  iconWidth.value = showHeight.value * 0.055
  imgIconWidth.value = cardDivHeight.value * 0.9
  imgRightDivWidth.value = cardWidth.value - imgIconWidth.value - 10
})
const minIndex = ref()
const cardOver = (index:number)=>{
  minIndex.value = index
}
const cardLeave = ()=>{
  minIndex.value = -1
}
const messageLeave = ref({})
const rightLeaveMessage = (message:object)=>{
  drawer.value = true
  messageLeave.value = message
}
//是否显示
const flag = ref(false)
const disFlag = ref(false)
let timeClear1:number,timeClear2:number;
const clickLeaveMessage = (leaveMessage:LEAVEMESSAGE.leaveMessage)=>{
  leaveStore.setLeaveMessage(leaveMessage)
}
const leaveMess = ref([])
const publicShow = (num:number) => {
  if(num===1){
    getLeaveMessage(loginUserIndex.value.userId).then((res)=>{
      leaveMess.value = JSON.parse(res.data.data.leaveMessageList)
    })
  }
  clearTimeout(timeClear1)
  clearTimeout(timeClear2)
  disFlag.value = true
  setTimeout(function () {
    flag.value = true
  },1)
}
const publicOut = () => {
  timeClear1 = setTimeout(function () {
    flag.value = false
    timeClear2 = setTimeout(function () {
      disFlag.value = false
    },400)
  },100)
}
</script>

<style scoped>
.leaveMessageClass{
  width: 16.8%;
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #f1ecec;
  cursor: pointer;
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
  right: 29%;
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
  height: 100%;
  /*margin-left: 1%;*/
  /*overflow: hidden;*/
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /*border: 1px solid black;*/
}
.userIcon img{
  width: 90%;
  height: 90%;
  border-radius: 50%;
}
.userMessage{
  height: 98%;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  font-size: 16px;
  /*border: 1px solid red;*/
}
.userMessage div{
  width: 100%;
  /*height: 30%;*/
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
}
.span3{
  font-size: 12px;
  margin-right: 20px;
}
.span1{
  width: 50%;
  display: flex;
  font-size: 15px;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
.span2{
  width: 90%;
  margin: 2px 0;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  text-align: left;
}
.backCardDiv{
  background-color: #e3e1e1;
}
.notLeaveClass{
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
.drawerDiv{
  margin-top: 1%;
  width: 100%;
  background-color: rgba(245, 245, 245, 0.67);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 40px;
}
.imgHeadDrawer{
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
}
.imgHeadDrawer img{
  width: 100%;
  height: 100%;
}
.rightDrawerDiv{
  margin: 4% 0;
  width: 80%;
  margin-left: 3%;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  font-size: 22px;
  text-align: left;
  color: #6f6d6d;
  font-weight: bold;
  font-family: KaiTi,sans-serif;
}
.drawerDiv1{
  cursor: pointer;
  width: 100%;
  height: 5%;
  color: #6f6d6d;
  font-weight: bold;
  font-size: 28px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-family: KaiTi,sans-serif;
}
.drawerDiv3{
  width: 100%;
  margin-top: 1%;
  height: 3%;
  color: #6f6d6d;
  /*border: 1px solid black;*/
  font-weight: bold;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: KaiTi,sans-serif;
}
</style>