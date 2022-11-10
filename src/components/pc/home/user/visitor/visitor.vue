<template>
  <div
      :style="[
          {backgroundImage:'url('+imgIconSrc+'visitorIcon.png)'},
          {backgroundSize: '100%'}
          ]"
      class="visitor"
      @mouseenter="publicShow"
      @mouseleave="publicOut">
  </div>
  <transition name="el-fade-in-linear">
    <messageTem
      v-show="flag"
      @mouseenter="publicShow"
      @mouseleave="publicOut"
      :headMessage="headMessage">
      </messageTem>
  </transition>
</template>

<script setup lang="ts">
import messageTem from '../util/messageTem.vue'
import {ref} from "vue";
import { globalStore } from "@/store/global/global";
import {storeToRefs} from "pinia";

const { imgIconSrc } = storeToRefs(globalStore())

//传递给子组件
const headMessage = ref("访客")
//是否显示
const flag = ref(false)
const publicShow = () => {
  flag.value = true
}
const publicOut = () => {
  flag.value = false
}
</script>

<style scoped>
.visitor{
  width: 18.5%;
  height: 100%;
  border-radius: 50%;
  background-color: #ededef;
  cursor: pointer;
}
img{
  width: 55px;
  height: 55px;
}
</style>