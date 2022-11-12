<template>
  <div class="backOut">
    <div
        :style="[
            {width: flagComment ? outWidthLong + 'px' : outWidthShort + 'px'}
            ]"
        class="outClass">
      <div
          class="indexClass">
        <vue3VideoPlay
            :="options"
            :src="(videoSrc+videoUrl)"
        />
      </div>
      <div class="titleClass">
        <span>title</span>
        <span>reline号：</span>
      </div>
      <div class="messageClass">
        <span>@蛋蛋</span>
        <span>Message</span>
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
        <div @click="flagComment = !flagComment">
          <img :src="(imgIconSrc+'videoComment.svg')" alt="评论"/>
          <span>{{count.comment}}</span>
        </div>
      </div>
    </div>
    <div
        :style="[
            {width: flagComment ? '0' : commentWidth + 'px'}
            ]"
        class="commentClass">
    <span :style="[
        {width: commentSpanWidth + 'px'}
    ]">全部评论（242）</span>
      <el-scrollbar
          noresize
          height="100%">
        <el-card
            :style="[
            {width: commentWidth + 'px'}
          ]"
            class="comment-card">
          <div
              class="cardDataDiv"
              :key="key"
              v-for="(commentData,key) in commentMessage">
            <div class="userIcon">
              <img :src="(imgIconSrc+commentData.head)" alt="用户">
            </div>
            <div class="userMessage">
              <span>{{commentData.nickName}}</span>
              <span>{{commentData.comment}}</span>
              <span>{{commentData.nickName}}-{{commentData.address}}</span>
            </div>
          </div>
        </el-card>
      </el-scrollbar>
      <div class="userComment">
        <el-input
            class="userCommentInput"
            v-model="userCommentInput"
            type="string"
            maxlength="89"
            minlength="1"
            :size="30"
            @focus="onFocusClear"
            @blur="onBlurClear"
            placeholder="留下您精彩的评论吧">
          <template #append>
            <div
                class="commentAppend"
                @mousedown="iconSize = !iconSize"
                @mouseup="iconSize = !iconSize"
                @click="sendComment">
              <el-icon
                  style="transition: 0.1s"
                  :size="(iconSize ? 30 : 35)"
                  :color= "iconSize ? 'white' : '#c586f2'"><Position /></el-icon>
            </div>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import like from '@/components/pc/home/video/util/like.vue'
import {storeToRefs} from "pinia";
import {globalStore} from "@/store/global/global";
import { routerPush } from "@/store/routerPush";
const { videoUrl } = storeToRefs(routerPush())

const { imgIconSrc,videoSrc,showWidth } = storeToRefs(globalStore())
const commentSpanWidth = ref()
const outWidthLong = ref()
const outWidthShort = ref()
let commentWidth = ref()
onMounted(()=>{
  outWidthLong.value = showWidth.value * 0.874
  outWidthShort.value = outWidthLong.value * 0.8
  commentWidth.value = outWidthLong.value * 0.2
  commentSpanWidth.value = commentWidth.value * 0.92
})
const iconSize = ref(true)
const likeName = ref("like")
const collectName = ref("collect")
const flagComment = ref(true)
const count = ref({
  like:12,
  collect:34,
  comment:53
})
const userCommentInput = ref('')
const commentMessage = ref([
  {
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },
  {
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },{
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },{
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },{
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },
  {
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },
  {
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },
  {
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },
  {
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },{
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },
  {
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },
  {
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },
  {
    head:"user.png",
    nickName:"王雪",
    comment:"评论了",
    time:"3天前",
    address:"陕西",
  },
])

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
.backOut{
  position: absolute;
  background-color: #0f0f1a;
  width: 87.4%;
  top: 8.5%;
  left: 11%;
  height: 90.8%;
}
.outClass{
  position: absolute;
  left: 0;
  height: 100%;
  background-color: #0f0f1a;
  z-index: 1;
  transition: 0.4s cubic-bezier(0.32, 0.88, 0.54, 1);
}
.indexClass{
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: 0;
  /*border: 1px solid black;*/
}
.commentClass{
  position: absolute;
  height: 100%;
  right: 0;
  background-color: #20212c;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  transition: 0.4s cubic-bezier(0.32, 0.88, 0.54, 1);
  z-index: 1;
}
.commentClass span{
  height: 7%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-left: 8%;
  font-size: 20px;
  font-weight: bold;
  color: white;
  font-family: STFangsong, sans-serif;
}
:deep(.el-scrollbar){
  width: 100%;
}
.comment-card{
  height: 90%;
  border-radius: 0;
  border: none;
  color: white;
  background-color: #20212c;
}
.cardDataDiv{
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  /*border: 1px solid red;*/
}
.userIcon{
  width: 15.628%;
  height: 60%;
  margin-left: 4%;
  /*border: 1px solid red;*/
}
.userIcon img{
  width: 100%;
  height: 100%;
}
.userMessage{
  width: 80.3%;
  margin-top: 3%;
  height: 86%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /*border: 1px solid red;*/
}
.userMessage span{
  font-size: 16px;
  width: 100%;
  height: 20%;
}
.userMessage span:nth-child(1){
  font-size: 15px;
}
.userMessage span:nth-child(3){
  font-size: 12px;
}
.titleClass{
  position: absolute;
  top: 1%;
  left: 1%;
  width: 12%;
  height: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  color: white;
  font-size: 20px;
  font-weight: bold;
  font-family: STXinwei,serif;
}
.messageClass{
  position: absolute;
  top: 83%;
  left: 1%;
  width: 86%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  color: white;
  font-size: 22px;
  font-weight: bold;
  font-family: STKaiti,serif;
}
.messageClass span:first-child{
  font-size: 26px;
}
.messageClass span:nth-child(2){
  margin-left: 6px;
}
.userButton{
  z-index: 2;
  position: absolute;
  top: 42%;
  width: 3%;
  height: 40%;
  right: 1%;
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
  z-index: 3;
  cursor: pointer;
}
.userComment{
  width: 100%;
  height: 6%;
  position: absolute;
  bottom: 0;
}
.userCommentInput{
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: white;
  background-color: #20212c;
}
.commentAppend{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-family:Arial,Helvetica,sans-serif;
  cursor: pointer;
}
:deep(.el-input__wrapper){
  background-color: #20212c;
  box-shadow: 1px 0 0 1px #383836;
}
:deep(.el-input__inner){
  color: white;
}
:deep(.el-input-group__append){
  width: 20%;
  padding: 0;
  background-color: #20212c;
  box-shadow: 1px 0 0 1px #383836;
}
</style>