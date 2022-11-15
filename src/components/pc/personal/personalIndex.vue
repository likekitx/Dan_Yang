<template>
  <div class="personalIndex">
    <el-scrollbar
        ref="scrollBar"
        height="100%"
        :noresize="false">
      <div class="personalIndexOne">
        <div class="personalIndexTwo">
          <div class="userMessage">
            <div class="userMessage-top-head">
              <img :src="(personalMessage.userHeadImg)" alt="头像">
            </div>
            <div class="userMessage-top-message">
              <span class="userMessage-top-message-span1">{{ personalMessage.userNickname }}</span>
              <div class="userMessage-top-message-sex">
                <span>reline号:{{ personalMessage.userReline }}</span>
                <span class="userMessage-top-message-sex-span2">{{ personalMessage.userSex }}  {{personalMessage.userAge}}岁</span>
              </div>
              <span class="userMessage-top-message-span2">{{ personalMessage.userIntroduce }}</span>
              <div class="threeNumber">
                <span>关注{{ subNumber(personalMessage.userAttentionCount) }}</span>
                <span>粉丝{{ subNumber(personalMessage.userFansCount) }}</span>
                <span>获赞{{ subNumber(personalMessage.hasUserLikeCount) }}</span>
              </div>
            </div>
          </div>
          <div class="userMessage-bottom">
            <span
                @click="clickPersonalSpan(1)"
                @mouseleave="cardLeave(1)"
                @mouseenter="cardOver(1)"
                :class="{userMessageBottomSpanClass: 1 === minIndex}"
            >作品{{ subNumber(personalMessage.userVideoCount) }}</span>
            <span
                @click="clickPersonalSpan(2)"
                @mouseleave="cardLeave(2)"
                @mouseenter="cardOver(2)"
                :class="{userMessageBottomSpanClass: 2 === minIndex}"
            >喜欢{{subNumber(personalMessage.userVideoLikeCount) }}</span>
            <span
                @click="clickPersonalSpan(3)"
                @mouseleave="cardLeave(3)"
                @mouseenter="cardOver(3)"
                :class="{userMessageBottomSpanClass: 3 === minIndex}"
            >收藏{{ subNumber(personalMessage.userVideoCollectCount) }}</span>
            <span
                @click="clickPersonalSpan(4)"
                @mouseleave="cardLeave(4)"
                @mouseenter="cardOver(4)"
                :class="{userMessageBottomSpanClass: 4 === minIndex}"
            >观看历史{{ subNumber(personalMessage.userVideoHistoryCount) }}</span>
<!--            <span-->
<!--                @click="addLeaveMessage"-->
<!--            >留言</span>-->
            <span>留言</span>
          </div>
          <div class="userVideo">
            <el-row
                :gutter="20"
                style="width: 100%;height: 100%"
                justify="left">
              <el-col
                  :span="6"
                  v-for="(video,index) in personalVideo"
                  :key="index"
                  @click.capture="routerView(video)"
                  class="videoBtu">
                <video class="videoClass" :src="(video.videoUrl)"/>
                <div class="introduceClass">
                  <span class="introduceSpan">{{ video.videoIntroduce }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>

  <el-dialog v-model="dialogFormVisible" title="留言">
    <el-form :model="form">
      <el-form-item label="内容" :label-width="formLabelWidth">
        <el-input v-model="form.message" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addleave(personalMessage.userId,loginUserIndex.userId)">
          发送
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { globalStore } from '@/store/global/global'
import { videoStore } from "@/store/video/videoStore";
import { loginStore } from "@/store/login/loginStore";
import { userStore } from "@/store/user/userStore";
import {getPersonal} from '@/api/userApi/userApi'
import {getUserVideo, getUserVideoCollect, getUserVideoHistory, getUserVideoLike} from '@/api/video/videoApi'
import {onMounted, reactive, onBeforeMount, ref, watch} from "vue";
//路由点击视频放大
import { useRouter,useRoute } from 'vue-router'
import { subNumber } from '@/utils/utilsTool'
import {ElScrollbar,ElLoading,ElMessage} from "element-plus";
import {VIDEO} from "@/api/utils/video";
import { loading } from '@/utils/user/userUtils'
import {visitorsStore} from "@/store/visitors/visitorsStore";
import { addVisitors } from '@/api/visitors/visitorsApi'
import { addLeave } from '@/api/leaveMessage/leaveMessageApi'

const { imgIconSrc,videoSrc } = storeToRefs(globalStore())
const { videoPageIndex,videoPlayIndex,personalVideo } = storeToRefs(videoStore())
const { loginUserIndex } = storeToRefs(loginStore())
const { personalMessage,userTemMessage,personalNumber } = storeToRefs(userStore())
const { visitorsNum } = storeToRefs(visitorsStore())
const videoPush = videoStore()

const scrollBar = ref<InstanceType<typeof ElScrollbar>>()
const isLike = ref(false)
onMounted(()=>{
  scrollBar.value!.setScrollTop(0)
})
watch(personalNumber, async (newQuestion, oldQuestion) => {
  minIndexFlag.value = newQuestion
  minIndexIf.value = true
  minIndex.value = newQuestion
  clickPersonalSpan(newQuestion)
})
const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  message: ''
})
const addLeaveMessage = ()=>{
  dialogFormVisible.value = true
}
const addleave = (leaveId:string,userId:string)=>{
  addLeave(leaveId,userId,form.message).then((res)=>{
    ElMessage({
      type: 'success',
      message:res.data.message
    })
    dialogFormVisible.value = false
  })
}
const minIndex = ref(personalNumber.value)
const minIndexFlag = ref(1)
const minIndexIf = ref(false)
const cardOver = (index:number)=>{
  minIndex.value = index
}
const cardLeave = (index:number)=>{
  if(minIndexIf.value === false){
    minIndex.value = 1
  }else {
    minIndex.value = minIndexFlag.value
  }
}
const router = useRouter()
const clickPersonalSpan = (number:number)=>{
  minIndexFlag.value = number
  minIndexIf.value = true
  loading()
  setTimeout(function () {
    switch (number){
      case 1:
        getUserVideo(personalMessage.value.userId).then((res)=>{
          videoPush.setPersonalVideo(null);
          videoPush.setPersonalVideo(JSON.parse(res.data.data.personalVideoList));
        })
        break;
      case 2:
        getUserVideoLike(personalMessage.value.userId).then((res)=>{
          videoPush.setPersonalVideo(null);
          videoPush.setPersonalVideo(JSON.parse(res.data.data.personalVideoList));
        })
        break;
      case 3:
        getUserVideoCollect(personalMessage.value.userId).then((res)=>{
          videoPush.setPersonalVideo(null);
          videoPush.setPersonalVideo(JSON.parse(res.data.data.personalVideoList));
        })
        break;
      case 4:
        getUserVideoHistory(personalMessage.value.userId).then((res)=>{
          videoPush.setPersonalVideo(null);
          videoPush.setPersonalVideo(JSON.parse(res.data.data.personalVideoList));
        })
        break;
    }
  },300)
}
const routerView = (video:VIDEO.personalVideo) => {
  setTimeout(function (){
    videoPush.setVideoPageIndex(video)
    router.push({
      name: 'videoPlay'
    });
  },100)
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
  border-radius: 50%;
  overflow: hidden;
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
  font-weight: bold;
  font-family: STKaiti,sans-serif;
}
.userMessage-top-message-span1{
  font-weight: bold;
  font-family: KaiTi,sans-serif;
  height: 25%;
  font-size: 24px;
}
.userMessage-top-message-span2{
  height: 20%;
  font-size: 16px;
  font-weight: bold;
  font-family: STKaiti,sans-serif;
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
  padding-left: 3px;
  font-family: STFangsong,sans-serif;
}
.userMessage-top-message-sex-span2{
  border: 1px dashed #cdcdcd;
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
  padding: 1% 0;
  /*border: 1px solid #0079ff;*/
  background-color: #f9fbfd;
  display: flex;
  flex-direction: row;
  justify-content: left;
  font-family: KaiTi,sans-serif;
  align-items: center;
  z-index: 100;
}
.userMessage-bottom span{
  /*border: 1px solid black;*/
  font-size: 22px;
  font-weight: bold;
  width: 12%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1% 0;
  align-items: center;
  cursor: pointer;
  transition: 0.5s cubic-bezier(0.72, 0.88, 0.54, 1);
}
.userMessageBottomSpanClass{
  background-color: #eaebf3;
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
  width: 18%;
  height: 400px;
  cursor: pointer;
  overflow: hidden;
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
  font-size: 17px;
  /*border: 1px solid black;*/
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  font-weight: bold;
  font-family: KaiTi,sans-serif;
}
</style>