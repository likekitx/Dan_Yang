<template>
  <div id="indexId" class="indexClass">
    <el-scrollbar
        ref="scrollBar"
        height="100%"
        :noresize="false">
      <div class="indexClassRow">
        <div
            v-for="(srcData,key) in videoData"
            :key="key"
            @click.capture="routerView(srcData)"
            class="videoBtu">
          <vue3VideoPlay
              :="options"
              :src="(videoSrc+srcData)"
          />
          <div class="introduceClass">
            <span class="introduceSpan">简介</span>
            <div class="nameTime">
              <span>@曹蛋蛋</span>
              <span>~</span>
              <span>2022年</span>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue"
import {storeToRefs} from "pinia"
import { globalStore } from "@/store/global/global"
import { ElScrollbar } from 'element-plus'

const scrollBar = ref<InstanceType<typeof ElScrollbar>>()
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

const options = reactive({
  width: "100%",
  height: "75%",
  color: "#409eff",
  title: "title",
  poster:"",
  muted: true, //静音
  // poster:"",//封面
  webFullScreen: false,
  autoPlay: false, //自动播放
  control: false, //是否显示控制
});

const { videoSrc } = storeToRefs(globalStore())

//路由点击视频放大
import { useRouter } from 'vue-router'
const router = useRouter()

const routerView = (srcData:string) => {
  setTimeout(function (){
    router.push({
      name: 'videoZoomIn',
      params:{
        name:srcData
      }
    });
  },10)
}

</script>

<style scoped>
.indexClass{
  position: absolute;
  top: 8.5%;
  left: 10.4%;
  width: 88%;
  height: 90.7%;
  /*border: 1px solid black;*/
}
.indexClassRow{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  /*border: 1px solid black;*/
}
.videoBtu{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  /*width: 398px;*/
  width: 23%;
  height: 390px;
  background-color: #252632;
  border-radius: 13px;
}
.introduceClass{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25%;
  color: white;
  font-family:“Microsoft YaHei”,sans-serif;
  /*border: 1px solid black;*/
}
.introduceSpan{
  width: 90%;
  height: 70%;
  font-size: 18px;
  font-weight: 500;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nameTime{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 30%;
  /*border: 1px solid black;*/
}
.nameTime span{
  font-size: 15px;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.nameTime span:nth-child(2){
  width: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
:deep(.d-player-wrap){
  border-radius: 13px 13px 0 0;
}
:deep(.d-player-input){
  cursor: pointer;
}
:deep(.d-play-btn){
  display: none!important;
}
</style>