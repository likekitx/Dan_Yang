<template>
  <div id="indexId" class="indexClass">
    <el-scrollbar
        ref="scrollBar"
        height="100%"
        :noresize="false">
      <div class="indexClassRow">
        <el-row
            :gutter="20"
            style="width: 100%;height: 100%"
            justify="left">
          <el-col
              :span="6"
              v-for="(video,index) in videoData"
              :key="index"
              @click.capture="routerView(video)"
              class="videoBtu">
            <video class="videoClass" :src="(video.videoUrl)"/>
            <div class="introduceClass">
              <span class="introduceSpan">{{ video.videoIntroduce }}</span>
              <div class="nameTime">
                <span>{{ video.userNickName }}</span>
                <span>~</span>
                <span>{{ video.videoCreateTime }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, onMounted, reactive, ref} from "vue"
import { videoStore } from "@/store/video/videoStore";
import { storeToRefs } from "pinia";
import { ElScrollbar } from 'element-plus'
import { VIDEO } from "@/api/utils/video"; 
//路由点击视频放大
import { useRouter } from 'vue-router'
import { requestHomeVideo } from '@/api/video/videoApi'
const router = useRouter()
const routerParams = videoStore()

const routerView = (videoPageIndex:VIDEO.videoPageIndex) => {
  setTimeout(function (){
    routerParams.setVideoPageIndex(videoPageIndex)
    router.push({
      name: 'videoPlay'
    });
  },100)
}
const scrollBar = ref<InstanceType<typeof ElScrollbar>>()
onMounted(()=>{
  scrollBar.value!.setScrollTop(0)
})
let videoData = ref([])
onBeforeMount(()=>{
  requestHomeVideo().then((res)=>{
    videoData.value = JSON.parse(res.data.data.videoList)
  })
})
</script>

<style scoped>
.indexClass{
  position: absolute;
  top: 8.5%;
  left: 10.4%;
  width: 88%;
  height: 90.8%;
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
  overflow: hidden;
  cursor: pointer;
}
.videoClass{
  width: 100%;
  height: 75%;
  background-color: #000000;
  border-radius: 13px 13px 0 0;
}
.introduceClass{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25%;
  color: white;
  border-radius: 0 0 13px 13px;
  background-color: #252632;
  font-family:“Microsoft YaHei”,sans-serif;
  /*border: 1px solid black;*/
}
.introduceSpan{
  width: 92%;
  height: 55%;
  font-size: 20px;
  font-weight: bold;
  font-family: KaiTi,sans-serif;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: row;
  text-align: left;
  align-items: center;
}
.nameTime{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
  height: 30%;
  /*border: 1px solid black;*/
}
.nameTime span{
  font-size: 16px;
  font-family: STKaiti,sans-serif;
  font-weight: bold;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.nameTime span:nth-child(2){
  width: 30px;
  display: flex;
  font-size: 14px;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  flex-direction: row;
  justify-content: center;
}
</style>