<template>
  <div
      :style="[
            { width: iconWidth + 'px' },
            {backgroundImage:'url('+imgIconSrc+'visitorIcon.png)'},
             {backgroundSize: '90%'}
            ]"
      class="visitor"
      @mouseenter="publicShow(1)"
      @mouseleave="publicOut">
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
        <span>访客</span>
      </div>
    <el-scrollbar
        height="90%"
        noresize>
      <div
          :key="index"
          :style="[
              {height: cardDivHeight + 'px'}
          ]"
          @mouseleave="cardLeave"
          @mouseenter="overIndex(index)"
          :class="{backCardDiv : minIndex === index}"
          v-for="(commentData,index) in Visitors"
          class="cardDiv">
        <div
            @click="inIconPersonal(commentData.userId)"
            :style="[{
            width: imgIconWidth + 'px',
            height:imgIconWidth + 'px'
          }]"
            class="userIcon">
          <img :src="(commentData.userHeadImg)" alt="用户">
        </div>
        <div
            :style="[{
            width: imgRightDivWidth + 'px'
          }]"
            class="userMessage">
          <span
              @click="inIconPersonal(commentData.userId)"
              class="span1">{{commentData.userNickName}}</span>
          <span class="span2">{{commentData.visitorsTime}}</span>
        </div>
      </div>
      <div class="notVisitorsClass">
        <span>暂时没有更多的访客</span>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import { globalStore } from "@/store/global/global";
import { loginStore } from "@/store/login/loginStore";
import { visitorsStore } from "@/store/visitors/visitorsStore";
import {storeToRefs} from "pinia";
import { getVisitors } from '@/api/visitors/visitorsApi'
import {getPersonalMessage} from "@/utils/user/userUtils";
import { useRouter } from "vue-router";
import {addVisitors } from '@/api/visitors/visitorsApi'

const visitorsIn = visitorsStore()
const { loginUserIndex } = storeToRefs(loginStore())
const { imgIconSrc,showWidth,showHeight } = storeToRefs(globalStore())
const cardWidth = ref()
const cardHeight = ref()
const cardTop = ref()
const cardHead = ref()
const cardDivHeight = ref()
const imgIconWidth = ref()
const imgRightDivWidth = ref()
const router = useRouter()

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
const iconWidth = ref()
onBeforeMount(()=>{
  cardWidth.value = showWidth.value * 0.16
  cardHeight.value = showHeight.value * 0.6
  cardTop.value = showHeight.value * 0.06
  cardHead.value = cardHeight.value * 0.1 - 2
  cardDivHeight.value = showHeight.value * 0.07
  iconWidth.value = showHeight.value * 0.055
  imgIconWidth.value = cardDivHeight.value * 0.9
  imgRightDivWidth.value = cardWidth.value - imgIconWidth.value - 15
})
const minIndex = ref()
const overIndex = (index:number)=>{
  minIndex.value = index
}
const cardLeave = ()=>{
  minIndex.value = -1
}
//是否显示
const flag = ref(false)
const disFlag = ref(false)
let timeClear1:number,timeClear2:number;
const Visitors = ref([])
const publicShow = (num:number) => {
  if(num===1){
    getVisitors(loginUserIndex.value.userId).then((res)=>{
      Visitors.value = JSON.parse(res.data.data.visitorsList)
      visitorsIn.setVisitorsList(res.data.data.visitorsList)
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
.visitor{
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
  right: 82%;
  display: flex;
  flex-direction: column;
  transition: height 0.4s;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
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
  justify-content: center;
  align-items: flex-start;
  font-size: 16px;
  /*border: 1px solid red;*/
}
.span1{
  width: 50%;
  display: flex;
  font-size: 18px;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
.span2{
  width: 90%;
  margin-top: 3px;
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
.notVisitorsClass{
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.notVisitorsClass span{
  font-size: 16px;
  margin: 0;
}
</style>