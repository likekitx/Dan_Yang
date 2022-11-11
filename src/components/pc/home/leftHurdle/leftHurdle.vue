<template>
  <div class="left">
    <div class="logoLeftClass" @click="gohome">ReLineX</div>
    <div @click="isCollapse = !isCollapse" :collapse="isCollapse" class="iconFlexible"
         :style="[
             { left: isCollapse ? '28%' : '81%' },
             { height: menuHeight + 'px' }
         ]">

        <el-icon :size="35">
          <component :is='isCollapse ? "ArrowRight" : "ArrowLeft"' />
        </el-icon>
    </div>
    <el-menu id="leftMenu" default-active="1" class="left-menu" style="border-right: none" :collapse="isCollapse">
      
      <el-menu-item
          v-for="(data,index) in ic"
          @click="go(data.router)"
          :index="index"
          :key="index">
        <el-icon
            :size="30">
          <component :is="data.src"/>
        </el-icon>
        <template #title>{{data.message}}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import router from '@/router'

const isCollapse = ref(true)
const menuHeight = ref()
onMounted(()=>{
  menuHeight.value = document.getElementById("leftMenu")?.scrollHeight
})
const gohome=()=>{
  router.push({path:'/home'})
}

const ic = ref(
    [{
      src:"AddLocation",
      message:"首页",
      router:'/home'
    },{
      src:"Aim",
      message:"推荐",
      router:'/home'
    },{
      src:"AlarmClock",
      message:"关注",
      router:'/home'
    },],
)
const go=(ip: any)=>{
  router.push({path:ip})
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
  /*border: 1px solid black;*/
  position: absolute;
  width: 18.5%;
  top: 7%;
  border-right: 1px solid #dcdfe6;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  cursor: pointer;
}
.el-menu-item {
  font-size: 18px;
  font-family: “Microsoft YaHei”, sans-serif;
  color: #585353;
  -webkit-font-smoothing: none;
  /*border: 1px solid black;*/
}
</style>