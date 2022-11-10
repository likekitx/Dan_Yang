<template>
  <div class="indexClass">
    <vue3VideoPlay
        :="options"
        :src="(videoSrc+videoUrl)"
    />
  </div>
  <div class="userButton">
    <div>
      <img :src="(imgIconSrc+'user.png')" alt="用户"/>
    </div>
    <div>
      <like
          :iconName="likeName"/>
      <span>{{count.like}}</span>
    </div>
    <div>
      <like
          :iconName="collectName"/>
      <span>{{count.collect}}</span>
    </div>
    <div>
      <img :src="(imgIconSrc+'videoComment.svg')" alt="评论"/>
      <span>{{count.comment}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive,ref} from "vue";
import like from '@/components/pc/home/video/util/like.vue'
import {storeToRefs} from "pinia";
import {globalStore} from "@/store/global/global";
import { routerPush } from "@/store/routerPush";
const { videoUrl } = storeToRefs(routerPush())

const { imgIconSrc,videoSrc } = storeToRefs(globalStore())

const likeName = ref("like")
const collectName = ref("collect")

const count = ref({
  like:12,
  collect:34,
  comment:53
})

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
.indexClass{
  position: absolute;
  top: 8.5%;
  left: 10.4%;
  width: 88%;
  height: 90.7%;
  background-color: #c4c7cb;
  /*border: 1px solid black;*/
}
.userButton{
  position: absolute;
  top: 42%;
  width: 3%;
  height: 40%;
  right: 2%;
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
.userButton div{
  cursor: pointer;
}
</style>