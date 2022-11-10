<template>
  <div
      :style="[
          {backgroundImage:'url('+imgIconSrc+'messageIcon.png)'},
          {backgroundSize: '85%'}
          ]"
      @mouseenter="publicShow"
      @mouseleave="publicOut"
      class="messageClass">
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
const headMessage = ref("消息")
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
.messageClass{
  width: 18.5%;
  height: 100%;
  border-radius: 50%;
  background-color: #ededef;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center center;
}
img{
  width: 40px;
  height: 40px;
}
</style>