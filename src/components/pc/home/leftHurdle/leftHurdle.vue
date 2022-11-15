<template>
  <div class="left">
    <div
        @click="answerHome"
        class="logoLeftClass">ReLineX</div>
    <div class="menuClass">
      <div class="menuIcon">
        <span>
          <el-icon color="#6b65f0" :size="30"><HomeFilled /></el-icon>
        </span>
        <span>
          <el-icon color="#e58fac" :size="30"><Guide /></el-icon>
        </span>
        <span>
          <el-icon color="#efb336" :size="30"><SortUp /></el-icon>
        </span>
        <span>
          <el-icon color="#1296db" :size="30"><UploadFilled /></el-icon>
        </span>
      </div>
      <div
          :style="[
              {width: isCollapse ? '50%' : '0'}
          ]"
          class="menuOne">
        <span @click="answerHome">首页</span>
        <span @click="gdw">你敢点我</span>
        <span @click="yjx">有惊喜</span>
<!--        <span @click="upFile">上传视频</span>-->
        <span>上传视频</span>
      </div>
    </div>
    <div
        :style="[
            {right: isCollapse ? '0' : '50%'}
        ]"
        class="rightIcon">
      <div @click="isCollapse = !isCollapse"
           class="iconFlexible">
        <el-icon :size="35">
          <component :is='isCollapse ? "ArrowRight" : "ArrowLeft"' />
        </el-icon>
      </div>
    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="呸，你坏坏！"
      width="30%"
      :before-close="handleClose"
  >
    <span>好了好了，这次真不逗你啦！</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="wxzss">我想在试试？</el-button>
        <el-button type="primary" @click="qfg">
          求放过
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted,h, ref} from 'vue'
import { storeToRefs } from "pinia";
import { globalStore } from "@/store/global/global";
import { useRouter } from "vue-router";
import { loading } from "@/utils/user/userUtils";
import {ElMessage,ElNotification,ElLoading,ElMessageBox,ElSwitch } from "element-plus";
import {set} from "@vueuse/core";
const { showHeight,showWidth } = storeToRefs(globalStore())
const router = useRouter()
const isCollapse = ref(true)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
onMounted(()=>{
})
const upFile = ()=>{
  loading()
  setTimeout(function () {
    router.push({
      name:'upFile'
    })
  },500)
}
const yjx = ()=>{
  let we = setInterval(function () {
    loading()
  },100)
  setTimeout(function () {
    clearInterval(we)
  },5000)
}
const wxzss = ()=>{
  ElNotification({
    title:"小子够欠",
    message:"算了算了，放过你啦！",
    type:"success",
    duration:1000
  })
  setTimeout(function () {
    dialogVisible.value = false
  },1000)
}
const qfg = ()=>{
  let op = setInterval(function () {
    ElMessage({
      message:"呸,就不放过你!",
      type:"error",
      showClose:true,
      duration:300
    })
  },100)
  setTimeout(function () {
    clearInterval(op)
    ElNotification({
      message:"算了，下一位!",
      type:"success",
      duration:1000
    })
    dialogVisible.value = false
  },4000)
}
const dialogVisible = ref(false)
const gdw = ()=>{
  ElMessage({
    showClose:true,
    message: "你还真点？",
    type:'success',
    duration:4000
  })
  setTimeout(function () {
    const checked = ref<boolean | string | number>(false)
    ElMessageBox({
      title: '惊喜吗？在点下面这个试试？',
      // Should pass a function if VNode contains dynamic props
      message: () =>
          h(ElSwitch, {
            modelValue: checked.value,
            'onUpdate:modelValue': (val: boolean | string | number) => {
              checked.value = val
              if(val===true){
                dialogVisible.value = true
              }
            },
          }),
    })
  },1000)
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('你还敢关闭我?')
      .then(() => {
        done()
      })
      .catch(() => {
      })
}
const answerHome = ()=>{
  const loading = ElLoading.service({
    lock: true,
    text: '王雪亲亲，正在加载请稍等!',
    background: 'rgb(255,255,255)',
    spinner:svg,
    svgViewBox:'-10 -10 50 50'
  })
  setTimeout(function () {
    loading.close()
    router.push({name: "index"})
  },700)
}
</script>

<style scoped>
.left {
  position: absolute;
  left: 0;
  width: 10.4%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /*border: 1px solid black;*/
}
.logoLeftClass {
  /*border: 1px solid black;*/
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 47px;
  font-weight: 1000;
  color: rgba(183, 104, 239, 0.8);
  width: 100%;
  height: 7%;
  font-family: “Microsoft YaHei”, sans-serif;
  -webkit-font-smoothing: none;
}
.menuClass{
  width: 99.5%;
  position: absolute;
  left: 0;
  top: 7%;
  height: 88%;
  padding-top: 20%;
  display: inline-flex;
  flex-direction: row;
}
.menuIcon{
  width: 30%;
  height: 24%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.menuIcon span{
  height: 25%;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.menuOne{
  overflow: hidden;
  transition: width 0.4s ease-in;
  height: 24%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 20px;
  color: #494747;
  font-family: STKaiti,sans-serif;
  font-weight: 600;
}
.menuOne span{
  white-space: nowrap;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 25%;
  cursor: pointer;
}
.iconFlexible {
  width: 100%;
  height: 24%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.rightIcon{
  position: absolute;
  top: 7%;
  width: 20%;
  height: 88%;
  border-right: 1px solid #dcdfe6;
  padding-top: 20%;
  transition: right 0.4s ease-in;
}
</style>