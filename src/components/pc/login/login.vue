<template>
  <div
      :style="[{backgroundImage:'url('+imgIconSrc+'registerbackNone.png)'}]"
      class="bodyRegisterClass">
    <div
        :style="[{backgroundImage:'url('+imgIconSrc+'registerLeftIcon.png)'}]"
        class="leftIcon">
      relinex
    </div>
    <el-collapse-transition name="el-fade-in">
      <div 
          class="right"
          :style="[
            {width: isRight ? 504 + 'px' : 40+'px'},
          ]">
        <el-icon
          @click="isRight = !isRight"
          class="right-icon"
          :size="40">
          <component :is='isRight ? "ArrowRight" : "ArrowLeft"'/>
        </el-icon>
        <div class="login_right">
          <div>relinex</div>
          <el-form
              ref="ruleFormRef"
              :model="ruleForm"
              :rules="rules"
              label-width="100px"
              class="login-form"
              :size="formSize"
              status-icon
          >
            <div class="formNameClass">
              <img :src="(imgIconSrc+'resName.png')" alt="">
              <el-form-item
                  class="login-form-item"
                  label="账号"
                  prop="userPhone"
                  label-width="65px">
                <el-input class="login-form-item-input"
                          name="userPhone"
                          v-model="ruleForm.userPhone" />
              </el-form-item>
            </div>
            <div class="formNameClass">
              <img :src="(imgIconSrc+'password.png')" alt="">
              <el-form-item
                  label-width="65px"
                  class="login-form-item"
                  prop="userPassword"
                  label="密码">
                <el-input class="login-form-item-input"
                          type="password"
                          name="userPhone"
                          v-model="ruleForm.userPassword" />
              </el-form-item>
            </div>
            <div class="loginRes" @click="loginRegister">注册</div>
            <el-button class="formButtonSubmit" type="primary" @click="submitForm(ruleFormRef)">登陆</el-button>
          </el-form>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import {storeToRefs} from "pinia";
import { globalStore } from "@/store/global/global";
import { useUser } from "@/store/login";
import {reactive, ref,onMounted } from 'vue'
import type { FormInstance,FormRules} from 'element-plus'
import {useRouter,useRoute} from "vue-router";
import {getRsa,login} from "@/api/login/login";
//RSA加密
import { encryption,decrypt } from '@/utils/RSAUtil'
import { GetOs,GetCurrentBrowser } from "@/utils/systemTool";
import {User} from "@/utils/user/User";

const { imgIconSrc,showWidth,showHeight } = storeToRefs(globalStore())
const store = useUser();

const isRight = ref(true)

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  userPhone:''.trim(),
  userPassword:''.trim(),
})

const router = useRouter()
const route = useRoute()

const cip = ref('')
const cityName = ref('')
let script = document.createElement("script");
  script.src = 'https://pv.sohu.com/cityjson?ie=utf-8';
  document.body.appendChild(script);
  script.onload = function () {
      document.body.removeChild(script)
      cip.value = returnCitySN['cip']
      cityName.value = returnCitySN['cname']
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid:boolean, fields:any) => {
    if (valid) {
      getRsa(ruleForm.userPhone).then((res)=>{
        if(res.data.data){
          login({
              userPhone:ruleForm.userPhone,
              userPassword:encryption(ruleForm.userPassword,res.data.data.pSnowK),
              loginIp: cip.value,
              loginCity:cityName.value,
              loginBrowser:GetCurrentBrowser().browser+' '+GetCurrentBrowser().version,
              loginOs:GetOs()
            }).then((res)=>{
            if(res.data.code === 20001){
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: 'error'
              })
            }else if (res.data.code === 20000) {
              store.setToken(res.data.data.token);
              store.setAuth(true);
              store.setUser({
                userHeadUrl : decrypt(res.data.data.message,privateKey.value)
              });
              ElMessage({
                showClose: true,
                message: res.data.message,
                type: 'success'
              })
              setTimeout(function () {
                router.push(route.query.redirect || '/home');
              },100)
            }
          }).catch((error)=>{
              ElMessage({
                showClose: true,
                message: "登陆出错，请联系管理员!",
                type: 'error'
              })
          })
        }else {
          ElMessage({
            showClose: true,
            message: "登陆出错，请联系管理员!",
            type: 'error'
          })
        }
      }).catch((error)=>{
        ElMessage({
          showClose: true,
          message: "登陆出错，请联系管理员!",
          type: 'error'
        })
      })
    } else {
      ElMessage({
        showClose: true,
        message: "登陆出错，请联系管理员!",
        type: 'error'
      })
    }
  })
}
const privateKey = ref("MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEA2RWmiXberoxghfyi\n" +
    "XY7Ou6FP0joS/aFwJin7HNRpY6hZbKyD2zGZa6bW+ZmX6Z38RDvXPGgTECVD9zVY\n" +
    "oNXx8wIDAQABAkAFNrXnO0mh25E95pFnudRRQVCPdgGawdPVttBnItrdH9Sir7F4\n" +
    "rd6lb17AzAxcLIZv27pCtbSzBa020/bvvq4BAiEA79chKNJRbALhKk+AxPNWdSon\n" +
    "qncUuR6/WXmMP12lunMCIQDntgT8pCTsI88TwLyUeJM4UgBQJ+SGY4MnPLyndauK\n" +
    "gQIhAO+rGNXEJd07m2o+fD1TtWfrsiukR68dzLVKwx1nJX+FAiEAgEyI9lrtFtO9\n" +
    "FXLi+FLLMaQ2CCwOnVr8g/1deFvvYAECID/ngOsMsgZXzjdzlEA3yj4R87kY+Wj4\n" +
    "VOVc7epcCMSS")
const rules = reactive<FormRules>({
  userPhone: [
    { required: true, message: '账号不能为空', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]
})

const loginRegister = ()=>{
    router.push({
      name: 'register'
    })
}
</script>

<style scoped>
.bodyRegisterClass{
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-repeat:no-repeat;
  background-size: 100%;
}
.leftIcon{
  min-width: 340px;
  min-height: 70px;
  background-color: white;
  box-shadow: 0 0 3px 1px #cdcbcb;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-size: 14%;
  background-position: 10px center;
  font-size: 50px;
  color: rgb(18, 150, 219);
}
.right{
  position: absolute;
  right: 12px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  min-height: 381px;
  transition: width 1.5s;
  overflow: hidden;
  z-index: 1;
}
.right-icon{
  min-width: 40px;
  min-height: 60px;
  border-radius: 3px;
  cursor:pointer;
  transition: right 1.5s;
  background-color:rgba(241,235,235,0.81);
  z-index: 101;
}
.login_right{
  margin-right: 3px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 460px;
  min-height: 375px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 0 5px 1px #999;
  z-index: 100;
}
.login_right>div{
  text-align: center;
  width: 100%;
  min-height: 70px;
  font-size: 50px;
  color: rgb(18, 150, 219);
}
.login-form{
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-width: 340px;
  min-height: 230px;
}
.formNameClass{
  min-width: 320px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.formNameClass>img{
  width: 40px;
  height: 40px;
}
.login-form-item{
  min-width: 280px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  --font-size: 19px;
}
.login-form-item-input{
  width: 220px;
  min-height: 42px;
  font-size: 18px;
}
.loginRes{
  min-width: 325px;
  min-height: 20px;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  margin-left: 16px;
  font-family: “Microsoft YaHei”,sans-serif;
  color: #585353;
  -webkit-font-smoothing:none;
}
.loginRes:hover{
  font-family: “Microsoft YaHei”,sans-serif;
  color: #298df7;
  -webkit-font-smoothing:none;
  cursor: pointer;
}
.formButtonSubmit{
  min-width: 275px;
  min-height: 40px;
  margin-left: 50px;
  font-size: 17px;
  letter-spacing: 4px;
}
</style>