<template>
  <left/>
  <Search />
  <upload />
  <userTem />
  <el-divider />
  <router-view/>
</template>

<script setup lang="ts">
import left from '@/components/pc/home/leftHurdle/leftHurdle.vue'
import Search from '@/components/pc/home/search/search.vue'
import userTem from '@/components/pc/home/user/userTem.vue'
import upload from '@/components/pc/home/upload/upload.vue'
</script>

<style scoped>
.el-divider{
  position: absolute;
  top: 7%;
  width: 88%;
  left: 10.4%;
  /*border: 1px solid black;*/
  padding: 0;
  margin: 0;
}
</style>