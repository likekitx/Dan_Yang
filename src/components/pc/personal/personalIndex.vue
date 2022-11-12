<template>
  <div class="personalIndex">
    <el-scrollbar
        ref="scrollBar"
        height="100%"
        :noresize="false">
      <div class="backImg"></div>
      <div class="personalIndexOne">
        <div class="personalIndexTwo">
          <div class="userMessage">
            <div class="userMessage-top-head">
              <img :src="(imgIconSrc+'user.png')" alt="头像">
            </div>
            <div class="userMessage-top-message">
              <span class="userMessage-top-message-span1">喜欢雪</span>
              <div class="userMessage-top-message-sex">
                <span>reline号:123123123</span>
                <span class="userMessage-top-message-sex-span2">男18岁</span>
              </div>
              <span class="userMessage-top-message-span2">海鸥海鸥别叫啦，</span>
              <div class="threeNumber">
                <span>关注wq eq w</span>
                <span>粉丝</span>
                <span>获赞</span>
              </div>
            </div>
          </div>
          <div class="userMessage-bottom">
            <span>作品</span>
            <span>喜欢</span>
            <span>收藏</span>
            <span>观看历史</span>
          </div>
          <div class="userVideo">
            <div
                v-for="(srcData,key) in videoData"
                :key="key"
                @click.capture="routerView(srcData)"
                class="videoBtu">
              <video class="videoClass" :src="(videoSrc+srcData)"/>
              <div class="introduceClass">
                <span class="introduceSpan">简介</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { globalStore } from '@/store/global/global'
import { routerPush } from "@/store/routerPush";
import {onMounted, reactive,onUnmounted, ref} from "vue";
//路由点击视频放大
import { useRouter } from 'vue-router'
import {ElScrollbar} from "element-plus";

const { imgIconSrc,videoSrc } = storeToRefs(globalStore())
const routerParams = routerPush()

const scrollBar = ref<InstanceType<typeof ElScrollbar>>()
const isLike = ref(false)
onMounted(()=>{
  scrollBar.value!.setScrollTop(0)
})

const videoData = ref([
  "走马合唱.mp4",
  "走马.mp4",
  "周星驰（再见）.mp4",
  "这就是爱.mp4",
  "长大秋千.mp4",
  "云烟成雨.mp4",
  "原谅我不可自拔.mp4",
  "英文不认识.mp4",
  "疑心病.mp4",  "这就是爱.mp4",
  "长大秋千.mp4",
  "云烟成雨.mp4",
  "原谅我不可自拔.mp4",
  "英文不认识.mp4",
  "疑心病.mp4",  "这就是爱.mp4",
  "长大秋千.mp4",
  "云烟成雨.mp4",
  "原谅我不可自拔.mp4",
  "英文不认识.mp4",
  "疑心病.mp4",  "这就是爱.mp4",
  "长大秋千.mp4",
  "云烟成雨.mp4",
  "原谅我不可自拔.mp4",
  "英文不认识.mp4",
  "疑心病.mp4",
])
const router = useRouter()

const routerView = (srcData:string) => {
  routerParams.setVideoUrl(srcData)
  router.push({
    name: 'videoPlay',
  });
}
</script>

<style scoped>
.personalIndex{
  position: absolute;
  top: 8.5%;
  left: 10.4%;
  width: 88%;
  height: 90.8%;
  /*border: 1px solid black;*/
}
.personalIndexOne{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  z-index: 0;
  background-color: #f9fbfd;
  /*border: 1px solid #0277ff;*/
}
.personalIndexTwo{
  width: 89%;
  height: 99%;
  margin-top: 1%;
  z-index: 3;
  /*border: 1px solid #dc1f1f;*/
}
.userMessage{
  width: 100%;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.userMessage-top-head{
  width: 7.864%;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.userMessage-top-head>img{
  width: 100%;
  height: 100%;
}
.userMessage-top-message{
  width: 91.136%;
  margin-left: 1%;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  font-family: Microsoft YaHei;
}
/*.userMessage-top-message span{*/
/*  border: 1px solid black;*/
/*}*/
.userMessage-top-message-span1{
  height: 25%;
  font-size: 22px;
}
.userMessage-top-message-span2{
  height: 20%;
  font-size: 16px;
}
.userMessage-top-message-sex{
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  /*border: 1px solid black;*/
  align-items: center;
  font-size: 14px;
}
.userMessage-top-message-sex-span2{
  margin-left: 20px;
}
.threeNumber{
  width: 50%;
  height: 25%;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  font-size: 20px;
}
.threeNumber span:nth-child(1){
  padding-right: 20px;
  cursor: pointer;
}
.threeNumber span:nth-child(2){
  border-right: 1px solid black;
  border-left: 1px solid black;
  padding: 0 20px;
  cursor: pointer;
}
.threeNumber span:nth-child(3){
  padding: 0 20px;
  cursor: pointer;
}
.userMessage-bottom{
  position: sticky;
  top: 0;
  width: 100%;
  padding: 2% 0;
  /*border: 1px solid #0079ff;*/
  background-color: #f9fbfd;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  z-index: 100;
}
.userMessage-bottom span{
  /*border: 1px solid black;*/
  font-size: 19px;
  font-family: STHeiti;
  padding-right: 50px;
  cursor: pointer;
}
.userMessage-bottom span:nth-child(5){
  margin-left: 18%;
  padding: 0;
}
.userVideo{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  /*border: 1px solid black;*/
}
.videoBtu{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  /*width: 398px;*/
  width: 17%;
  height: 400px;
  overflow: hidden;
  /*border: 1px solid black;*/
  /*border-radius: 13px;*/
}
.videoClass{
  width: 100%;
  height: 86%;
  background-color: #000000;
  /*border: 1px solid black;*/
  border-radius: 12px;
}
.introduceClass{
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: start;
  width: 100%;
  height: 14%;
  color: #000000;
  font-family:“Microsoft YaHei”,sans-serif;
  /*border: 1px solid black;*/
}
.introduceSpan{
  margin: 2%;
  font-size: 16px;
  font-weight: 500;
  /*border: 1px solid black;*/
  display: flex;
  flex-wrap: wrap;
}
</style>