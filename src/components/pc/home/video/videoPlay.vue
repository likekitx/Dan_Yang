<template>
  <div class="indexClass">
    <el-row class="indexClassZoomRow">
      <el-col class="indexClassZoomCol" :span="24">
        <vue3VideoPlay
            :="options"
            :src="(videoSrc+route.params.name)"
            @loadeddata="playVideo"
        />
      </el-col>
    </el-row>
  </div>

  <div
      class="videoUserClass">
    <el-row
            class="videoUser"
            align="center"
            :style="[{height:'55px'}]"
            justify="center">
      <el-col>
        <div class="userClass">
          <img :src="(imgIconSrc+'user.png')" alt="用户"/>
        </div>
      </el-col>
    </el-row>
    <el-row align="center"
            justify="center">
      <el-col>
        <like
            :iconName="likeName"/>
        <div class="count">
          {{count.like}}
        </div>
      </el-col>
    </el-row>
    <el-row align="center"
            justify="center">
      <el-col>
        <like
            :iconName="collectName"/>
        <div class="count">
          {{count.collect}}
        </div>
      </el-col>
    </el-row>
    <el-row align="center"
            justify="center">
      <el-col>
        <div class="commentClass">
          <img :src="(imgIconSrc+'videoComment.svg')" alt="评论"/>
        </div>
        <div class="count">
          {{count.comment}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue"
import { globalStore } from '@/store/global/global'

//路由接受传参
import { useRoute } from 'vue-router'
const route = useRoute()

//主页视频范围的宽
const elRowVideo = ref(1400)

const options = reactive({
  width: "1695px",
  height: "800px",
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

import {storeToRefs} from "pinia";
const { showWidth,videoSrc } = storeToRefs(globalStore())
onMounted(()=>{
  elRowVideo.value =  1700 * showWidth.value / 1920
})

import like from '@/components/pc/home/video/util/like.vue'

const { imgIconSrc } = storeToRefs(globalStore())
const likeName = ref("like")
const collectName = ref("collect")

const count = ref({
  like:12,
  collect:34,
  comment:53
})

//是否显示
const flag = ref(false)
</script>

<style scoped>
.indexClassZoomRow{
  width: v-bind(elRowVideo + 'px');
}
.indexClassZoomCol{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 10px;
}
.d-player-wrap{
  border-radius: 13px;
}
.d-player-input{
  cursor: pointer !important;
}
.indexClass{
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  top: 105px;
  left: 200px;
}

.videoUserClass{
  position: absolute;
  width: 40px;
  height: 320px;
  top: 400px;
  right: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.userClass{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #e0e0e5;
  cursor: pointer;
  /*border: 1px solid black;*/
}
img{
  border-radius: 50%;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.videoUser{
  /*border: 1px solid black;*/
  width: 60px;
  height: 65px;
}
.count{
  /*border: 1px solid black;*/
  font-size: 16px;
  font-family: “Microsoft YaHei”,sans-serif;
  color: #ffffff;
  -webkit-font-smoothing:none;
}
</style>