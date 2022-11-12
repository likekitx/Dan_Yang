<template>
  <div class="userTemClass">
    <visitor/>
    <message/>
    <leaveMessage/>
    <div
        :style="[
            {backgroundImage:'url('+imgIconSrc+'longLineIcon.png)'}
        ]"
        class="sxClass"></div>
    <div
        @mouseenter="leaveIn"
        @mouseleave="leaveOut"
        @click="onUser"
        :style="[
            {backgroundImage: 'url('+imgIconSrc+'user.png)'},
             {backgroundSize: '90%'}
            ]"
        class="userClass">
    </div>
  </div>
  <div
      @mouseenter="leaveIn"
      @mouseleave="leaveOut"
      :style="[
          { height : flag ? '17%' : '0' }
        ]"
      class="userTemOut">
    <div
        :style="[{display: outFlag ? 'block' : 'none'}]"
        class="topTopPadding">
      <div class="publicUserTemTop">
        <div
            class="divLikeClass"
            v-for="data in data"
            :key="data">
          <div
              :style="[
              {backgroundImage: 'url('+imgIconSrc+data.src+')'}
              ]"
              class="divImgClass">
          </div>
          <span>{{data.count}}</span>
          <span>{{data.alt}}</span>
        </div>
      </div>
      <div class="divOut">
        <span>个人主页</span>
        <span @click="userLoginOut">退出登陆</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import visitor from './visitor/visitor.vue'
  import message from './comment/comment.vue'
  import leaveMessage from './leaveMessage/leaveMessage.vue'
  import { globalStore } from "@/store/global/global";
  import {storeToRefs} from "pinia";
  import {ref} from "vue";

  //路由点击头像跳转
  import { useRouter } from 'vue-router'
  import {loginOut} from "@/api/login/login";
  import {ElMessage} from "element-plus";

  const { imgIconSrc } = storeToRefs(globalStore())
  const router = useRouter()
  const onUser = () => {
    router.push({
      name:'userIndex'
    })
  }
  //是否显示
  const flag = ref(false)
  const outFlag = ref(false)
  let setTime1: number,setTime2: number;
  const leaveOut = ()=>{
    setTime1 = setTimeout(function (){
      flag.value = false
      setTime2 = setTimeout(function () {
        outFlag.value = false
      },150)
    },100)
  }
  const leaveIn = ()=>{
    clearTimeout(setTime1);
    clearTimeout(setTime2);
    outFlag.value = true
    flag.value = true
  }
  const data = ref([
    {
      src:"userWorkIcon.png",
      alt:"我的作品",
      count:4,
    },{
      src:"likeIcon.png",
      alt:"我的喜欢",
      count:23,
    },{
      src:"collectIconYellow.png",
      alt:"我的收藏",
      count:56,
    },{
      src:"historyIcon.png",
      alt:"浏览历史",
      count:14,
    }
  ])

  const userLoginOut = ()=>{
    loginOut().then((res)=>{
      console.log(res);
      if(res.data.code === 20000){
        localStorage.removeItem("token")
        ElMessage({
          showClose: true,
          message: res.data.message,
          type: 'success'
        })
        setTimeout(function () {
          router.push({name:'login'});
        },500)
      }
    })
  }
</script>

<style scoped>
.userTemClass{
  /*border: 1px solid black;*/
  position: absolute;
  width: 16%;
  height: 5.5%;
  right: 1.6%;
  top: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.sxClass{
  width: 15%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.userClass{
  width: 16.8%;
  height: 100%;
  border-radius: 50%;
  background-color: #ededef;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
}
.userTemOut{
  position: absolute;
  top: 7.5%;
  right: 1.6%;
  width: 18%;
  z-index: 4;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.16, 0.97, 0.22, 1.18);
}
.topTopPadding{
  position: absolute;
  width: 100%;
  /*border: 1px solid black;*/
  height: 100%;
  overflow: hidden;
  border-radius: 7px;
  box-shadow: 0 0 5px 1px #999;
}
.publicUserTemTop{
  border-radius: 7px 7px 0 0;
  /*border: 1px solid black;*/
  background-color: white;
  width: 100%;
  height: 74%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.divLikeClass {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  font-size: 15px;
  cursor: pointer;
  height: 100%;
  color: #615e5e;
}
.divLikeClass:hover{
  color: #000000;
}
.divLikeClass:hover .divImgClass{
  background-size: 95%;
}
.divImgClass{
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  width: 74%;
  height: 70%;
}
.divOut{
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  height: 26%;
  width: 100%;
  border-radius: 0 0 7px 7px;
}
.divOut span{
  display: inline-flex;
  /*border: 1px solid black;*/
  color: #585353;
  -webkit-font-smoothing:none;
  justify-content: center;
  align-items: center;
  width: 45%;
  font-size: 15px;
  height: 25px;
  cursor: pointer;
  border-radius: 15px;
  border: 1px solid #c6c3c3;
  font-family: “Microsoft YaHei”,sans-serif;
}
.divOut span:hover{
  color: #1296db;
  border: 1px solid #1296db;
}
</style>