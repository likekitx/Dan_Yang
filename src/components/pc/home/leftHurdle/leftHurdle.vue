<template>
  <div class="left">
    <div
        @click="answerHome"
        class="logoLeftClass">ReLineX</div>
    <div
        :style="[
             { left: isCollapse ? '28%' : '81%' },
             { height: outHeight + 'px' }
         ]"
        class="out-div">
      <div @click="isCollapse = !isCollapse" :collapse="isCollapse" class="iconFlexible"
           :style="[
             { height: menuHeight + 'px' }
         ]">

        <el-icon :size="35">
          <component :is='isCollapse ? "ArrowRight" : "ArrowLeft"' />
        </el-icon>
      </div>
    </div>
    <el-menu id="leftMenu"
             default-active="1"
             :style="[
                 {width: isCollapse ? '28%' : '87.5%'}
             ]"
             class="left-menu"
             :collapse="isCollapse">
      <el-menu-item index="1">
        <el-icon :size="30"><HomeFilled /></el-icon>
        <template #title>首页</template>
      </el-menu-item>

      <el-menu-item index="2">
        <el-icon :size="30"><Guide /></el-icon>
        <template #title>导航</template>
      </el-menu-item>

      <el-menu-item index="3">
        <el-icon :size="30"><SortUp /></el-icon>
        <template #title>推送</template>
      </el-menu-item>

      <el-menu-item index="4">
        <el-icon :size="30"><UploadFilled /></el-icon>
        <template #title>上传视频</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { storeToRefs } from "pinia";
import { globalStore } from "@/store/global/global";
const { showHeight } = storeToRefs(globalStore())
import { useRouter } from "vue-router";
const router = useRouter()
const isCollapse = ref(true)
const menuHeight = ref()
const outHeight = ref()
onMounted(()=>{
  outHeight.value = showHeight.value - (showHeight.value * 0.072)
  menuHeight.value = document.getElementById("leftMenu")?.scrollHeight
})
const answerHome = ()=>{
  router.push({name: "index"})
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
.iconFlexible {
  width: 100%;
  margin-top: 36px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 4;
}
.out-div{
  position: absolute;
  width: 18.5%;
  top: 7%;
  border-right: 1px solid #dcdfe6;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
}
.left-menu{
  margin-top: 36px;
  transition: 0.5s;
  border-right: none;
}
.el-menu-item {
  font-size: 18px;
  font-family: “Microsoft YaHei”, sans-serif;
  color: #585353;
  width: 100%;
  /*border: 1px solid black;*/
}
</style>