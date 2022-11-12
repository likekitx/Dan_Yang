<template>
  <div
      :style="[
          {backgroundImage:'url('+imgIconSrc+'leaveMessageIcon.png)'},
          {backgroundSize: '80%'}
          ]"
      @mouseenter="publicShow"
      @mouseleave="publicOut"
      class="leaveMessageClass">
  </div>
  <transition name="el-fade-in-linear">
    <el-card
        @mouseenter="publicShow"
        @mouseleave="publicOut"
        :style="[
            {width: cardWidth + 'px' },
            {height: flag ? cardHeight + 'px' : '0'},
            {top: cardTop + 'px' },
            {display : disFlag ? 'flex' : 'none'}
        ]"
        class="visitor-card">
      <template #header>
        <div class="cardHead">
          <span>留言</span>
        </div>
      </template>
      <el-scrollbar
          noresize
          height="100%">
        <div
            :style="[
                {height: cardDivHeight + 'px'}
            ]"
            @mouseenter="cardOver(index)"
            :class="{backCardDiv: index === minIndex}"
            :key="index"
            v-for="(commentData,index) in commentMessage"
            class="cardDiv">
          <div class="userIcon">
            <img :src="(imgIconSrc+commentData.head)" alt="用户">
          </div>
          <div class="userMessage">
            <span>{{commentData.nickName}}</span>
            <div>
              <span>{{commentData.content}}</span>
              <span>{{commentData.time}}</span>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-card>
  </transition>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

import { globalStore } from "@/store/global/global";
import {storeToRefs} from "pinia";
const { imgIconSrc,showWidth,showHeight } = storeToRefs(globalStore())
const cardWidth = ref()
const cardHeight = ref()
const cardTop = ref()
const cardHead = ref()
const cardDivHeight = ref()
onMounted(()=>{
  cardWidth.value = showWidth.value * 0.16
  cardHeight.value = showHeight.value * 0.6
  cardTop.value = showHeight.value * 0.06
  cardHead.value = cardHeight.value * 0.1
  cardDivHeight.value = showHeight.value * 0.054
})
const minIndex = ref()
const cardOver = (index:number)=>{
  minIndex.value = index
}
//是否显示
const flag = ref(false)
const disFlag = ref(false)
let timeClear1:number,timeClear2:number;
const publicShow = () => {
  clearTimeout(timeClear1)
  clearTimeout(timeClear2)
  disFlag.value = true
  setTimeout(function () {
    flag.value = true
  },10)
}
const publicOut = () => {
  timeClear1 = setTimeout(function () {
    flag.value = false
    timeClear2 = setTimeout(function () {
      disFlag.value = false
    },250)
  },100)
}
const commentMessage = ref([
  {
    head:"user.png",
    nickName:"王雪",
    content: '留言',
    time:"11-12",
  },
  {
    head:"user.png",
    nickName:"王雪",
    content: '留言',
    time:"11-12",
  }, {
    head:"user.png",
    nickName:"王雪",
    content: '留言',
    time:"11-12",
  },
  {
    head:"user.png",
    nickName:"王雪",
    content: '留言',
    time:"11-12",
  }, {
    head:"user.png",
    nickName:"王雪",
    content: '留言',
    time:"11-12",
  },
  {
    head:"user.png",
    nickName:"王雪",
    content: '留言',
    time:"11-12",
  }, {
    head:"user.png",
    nickName:"王雪",
    content: '留言',
    time:"11-12",
  },
])
</script>

<style scoped>
.leaveMessageClass{
  width: 16.8%;
  height: 100%;
  border-radius: 50%;
  background-color: #ededef;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
}
img{
  width: 38px;
  height: 38px;
}
.visitor-card{
  z-index: 4;
  background-color: white;
  position: absolute;
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
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-items: left;
  align-items: center;
  margin-left: 5%;
  font-size: 22px;
  cursor: default;
}
:deep(.el-card__header){
  width: 100%;
  height: v-bind(cardHead+'px');
  padding: 0;
  border-bottom: 2px solid #939393;
}
:deep(.el-card__body){
  width: 100%;
  height: 90%;
  padding: 0;
}
.cardDiv{
  width: 100%;
  padding-bottom: 15px;
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
  width: 16.4%;
  height: 100%;
  margin-left: 1%;
  /*border: 1px solid red;*/
}
.userIcon img{
  width: 100%;
  height: 100%;
}
.userMessage{
  width: 82.6%;
  margin-top: 2%;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  font-size: 16px;
  /*border: 1px solid red;*/
}
.userMessage div{
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.userMessage div span:first-child{
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
.userMessage div span:nth-child(2){
  width: 17%;
  margin-right: 5%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
}
.backCardDiv{
  background-color: #e3e1e1;
}
</style>