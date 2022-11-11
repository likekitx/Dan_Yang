<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="themetext" @click="gohome">ReLinex</div>
        <userTem />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <button  class="btn" @click="upload">发表视频</button>
        </el-aside>
        <el-main>
          <div class="person">
            
              <div class="headPhoto">

              </div>
              <div class="personText">
                <table class="tab-box">
                  <tr>
                    <td>{{person.name}}</td>
                  </tr>
                  <tr>
                    <td>{{person.praise}}获赞</td>
                    <td>{{person.attention}}关注</td>
                    <td>{{person.fans}}粉丝</td>
                    <td>relinex号:{{person.number}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                  </tr>
                  <tr>
                    <td>{{person.text}}</td>
                  </tr>
                </table>

            </div> 
          </div>
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import userTem from '@/components/pc/home/user/userTem.vue'
import { UploadFilled } from '@element-plus/icons-vue'
import router from '@/router'
import {ref} from 'vue'
const person = ref({
  name:'书生',
  praise:'1578',
  attention:'135',
  fans:'2035',
  number:'78921482',
  text:'你还没有个人简介'
})
const gohome=()=>{
  router.push({path:'/home'})
}
const upload=()=>{
  router.push({path:'/upload/upload2'})
}

</script>
<style scoped lang="scss">
.common-layout{
    width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-repeat:no-repeat;
  background-size: 100%;
}
 .el-header{
    height: 10%;
    width: 99%;
    margin-left: 10px;
    text-align: center;
    margin-top: 10px;
    border-radius: 7px;
    box-shadow: 0px 0px 8px 3px rgba(0,0,0,0.2);
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    border-radius: 7px;
    box-shadow: 0px 0px 8px 3px rgba(0,0,0,0.2);
    margin-top: 10px;
    margin-right: 5px;
    height: 98%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    border-radius: 7px;
    margin-top: 10px;
    box-shadow: 0px 0px 8px 3px rgba(0,0,0,0.2);
    height: 98%;
  }
  .person{
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    margin-bottom: 5px;
    border-radius: 7px;
    box-shadow: 0px 0px 8px 3px rgba(0,0,0,0.2);

}
.headPhoto{
    width: 100px;
    height: 100px;
    background-color: pink;
    border-radius: 50%;
    margin-bottom: 1%;
    margin-left: 1%;
    margin-top: 1%;
}
.personText{
    width: 80%;
    height: 100%;
    margin-left: 2%;
    margin-top: 1%;
}
.tab-box, .tab-box td{
    border-collapse:collapse;/* 让边框合并，不让出现双边框*/
  }
  .tab-box{
    width: 100%;
  }
  .tab-box tr{
    display: flex;/*flex布局*/
  }
  .tab-box td {
    flex: 1;/*让每个单元格宽度一样*/
    height:30px;
    padding-left:10px;
    display: flex;/*flex布局*/
    align-items: center;/*让单元格文字垂直居中*/
    color: #606266;
  }
  
  .themetext{
  position: relative;
  display: inline-flex;
  justify-content: center;
  float: left;
  align-items: center;
  font-weight:bold;
  font-size: 50px;
  color: rgba(183, 104, 239, 0.8);
  height: 95px;
  font-family: “Microsoft YaHei”,sans-serif;
  -webkit-font-smoothing:none;
  } 
  .btn{
    width: 180px; 
	height: 40px; 
    margin-top: 16px;
	border-width: 0px; 
	border-radius: 5px; 
	background:#db2d2d; /* 背景颜色 */
	cursor: pointer; 
	outline: none; /* 不显示轮廓线 */
	font-family: Microsoft YaHei; /* 设置字体 */
	color: #fff; /* 字体颜色 */
	font-size: 17px; /* 字体大小 */
  }

</style>