<template>
  <div :style="[
      {width: windowWidth + 'px'},
      {height: windowHeight + 'px'},
      ]">
    <router-view/>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { globalStore } from '@/store/global/global'
import { storeToRefs } from 'pinia'
const { showWidth,showHeight } = storeToRefs(globalStore())
const windowWidth = ref(0)
const windowHeight = ref(0)
onMounted(()=>{
  document.documentElement.scrollTop = 0
  windowWidth.value = showWidth.value
  windowHeight.value = showHeight.value
})
</script>

<style scoped>
</style>
