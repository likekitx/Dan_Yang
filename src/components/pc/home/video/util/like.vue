<template>
 <div @click="isLike = !isLike" class="like">
   <transition :name=" isLike ? 'zoom' : '' " mode="out-in">
     <img :src="(imgIconSrc+iconName+'.svg')" color="#FF0000" v-if="isLike" key="like"/>
     <img :src="(imgIconSrc+'un'+iconName+'.svg')" color="#333333" v-else key="unlike"/>
   </transition>
 </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import  { globalStore } from "@/store/global/global";
import {storeToRefs} from "pinia";
const { imgIconSrc } = storeToRefs(globalStore())

const props = defineProps({
    iconName:String
})

const isLike = ref(false)
</script>

<style scoped lang="scss">
.zoom-enter-active, .zoom-leave-active {
  transition: all .15s cubic-bezier(0.25, 0.1, 0.27, 1.32);
}

/** 设置进场开始的状态和离场结束的状态，都是缩放到0 **/
.zoom-enter, .zoom-leave-to {
  transform: scale(0);
}
/** 设置进场结束的状态和离场开始的状态, 都是缩放到1 **/
.zoom-enter-to, .zoom-leave {
  transform: scale(1);
}
.like>img{
  width: 100%;
  height: 100%;
}
.like{
  cursor:pointer;
}
</style>