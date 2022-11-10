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
        @mouseenter="flag = !flag"
        @mouseleave="flag = !flag"
        @click="onUser"
        :style="[
            {backgroundImage: 'url('+imgIconSrc+'user.png)'},
             {backgroundSize: '90%'}
            ]"
        class="userClass">
    </div>
    <el-collapse-transition>
      <div
          v-show="flag"
          @mouseenter="flag = !flag"
          @mouseleave="flag = !flag"
          class="topTopPadding">
        <div class="publicUserTemClass">
          <el-card>
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
          </el-card>
          <el-card>
            <div class="divOut">
              <span>个人主页</span>
              <span @click="userLoginOut">退出登陆</span>
            </div>
          </el-card>
        </div>
      </div>
    </el-collapse-transition>
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
  width: 15%;
  height: 5.5%;
  right: 24px;
  top: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.sxClass{
  width: 10%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.userClass{
  width: 18.5%;
  height: 100%;
  border-radius: 50%;
  background-color: #ededef;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
}
.topTopPadding{
  position: absolute;
  top: 95%;
  right: 3%;
  width: 109%;
  z-index: 99;
  height: 340%;
}
.publicUserTemClass{
  box-shadow: 0 0 5px 1px #999;
  margin-top: 6%;
  z-index: 100;
  border-radius: 7px;
  background-color: white;
  width: 100%;
}
.divLikeClass {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  margin: 3% 2%;
  font-size: 15px;
  cursor: pointer;
  height: 110%;
  color: #615e5e;
}
.divLikeClass:hover{
  color: #000000;
}
.divLikeClass:hover .divImgClass{
  background-size: 90%;
}
.divImgClass{
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  width: 76%;
  height: 48px;
}
.divOut{
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  /*border: 1px solid black;*/
  align-items: center;
  margin: 4px 0;
  /*width: 308px;*/
  /*height: 38px;*/
  width: 100%;
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