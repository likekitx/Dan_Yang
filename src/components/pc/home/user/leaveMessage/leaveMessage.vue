<template>
  <div
      :style="[
          {backgroundImage:'url('+imgIconSrc+'leaveMessageIcon.png)'},
          {backgroundSize: '80%'}
          ]"
      @mouseenter="publicShow"
      @mouseleave="publicOut"
      class="leaveMessageClass">
  </div>
  <el-collapse-transition>
    <messageTem
        v-show="flag"
        @mouseenter="publicShow"
        @mouseleave="publicOut"
        :headMessage="headMessage">
    </messageTem>
  </el-collapse-transition>
</template>
<script setup lang="ts">
import messageTem from '../util/messageTem.vue'
import {ref} from "vue";
import { globalStore } from "@/store/global/global";
import {storeToRefs} from "pinia";

const { imgIconSrc } = storeToRefs(globalStore())
const iconSrc = imgIconSrc.value


//传递给子组件
const headMessage = ref("留言")
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
.leaveMessageClass{
  width: 18.5%;
  height: 100%;
  border-radius: 50%;
  background-color: #ededef;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
}
img{
  width: 38px;
  height: 38px;
}
</style>