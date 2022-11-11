<template>
<div class="uploadmain">
    <button  class="btn" @click="upload">发表视频</button>
</div>
</template>
<script setup lang="ts">
import router from '@/router'
const upload=()=>{
    router.push({path:'/upload'})
}
</script>    
<style scoped>
.uploadmain{
  position: absolute;
  display: inline-flex;
  justify-content:center;
  left: 41% ;
  width: 200px;
  height: 80px;
  top: 20px;
  position: absolute;
}
.btn{
    width: 180px; 
	height: 40px; 
    margin-top: 16px;
	border-width: 0px; 
	border-radius: 5px; 
	background:#fce8f9; /* 背景颜色 */
	cursor: pointer; 
	outline: none; /* 不显示轮廓线 */
	font-family: Microsoft YaHei; /* 设置字体 */
	color: #fff; /* 字体颜色 */
	font-size: 17px; /* 字体大小 */
}
</style>