<template>
  <div :style="[{ backgroundImage: 'url(' + imgIconSrc + 'registerbackNone.png)' }]" class="bodyRegisterClass">
    <div :style="[{ backgroundImage: 'url(' + imgIconSrc + 'registerLeftIcon.png)' }]" class="leftIcon">
      relinex
    </div>
    <el-collapse-transition name="el-fade-in">
      <div class="right" :style="[
        { width: rightOne ? 504 + 'px' : 40 + 'px' },
      ]">
        <el-icon @click="rightOne = !rightOne" class="right-icon" :size="40">
          <component :is='rightOne ? "ArrowRight" : "ArrowLeft"' />
        </el-icon>
        <div class="register-right">
          <div>relinex</div>
          <el-form
              ref="refOne" :model="refFormOne"
              :rules="oneRules" label-width="100px"
              class="register-form"
            :size="formSize" status-icon>
            <div class="formNameClass">
              <img :src="(imgIconSrc + 'resName.png')" alt="">
              <el-form-item
                  class="register-form-item"
                  label="姓名"
                  label-width="65px"
                  prop="userName" required>
                <el-input class="register-form-item-input" v-model="refFormOne.userName" />
              </el-form-item>
            </div>
            <div class="formNameClass">
              <img :src="(imgIconSrc + 'resSex.png')" alt="">
              <el-form-item class="register-form-item" label-width="65px" label="性别" prop="userSex">
                <el-select size="large" v-model="refFormOne.userSex" placeholder="男">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </div>
            <div class="formNameClass">
              <img :src="(imgIconSrc + 'resPhone.png')" alt="">
              <el-form-item label-width="65px" class="register-form-item" label="电话" prop="userPhone" required>
                <el-input class="register-form-item-input" v-model="refFormOne.userPhone" />
              </el-form-item>
            </div>
            <div class="formNameClass">
              <img :src="(imgIconSrc + 'resAddress.png')" alt="">
              <el-form-item class="register-form-item" label-width="65px" label="地址" required prop="userAddress">
                <el-col :span="24">
                  <el-form-item>
                    <elui-china-area-dht size="large" class="elui-china-class" v-model="refFormOne.userAddress"
                     />
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>
            <div class="formNameClass">
              <img :src="(imgIconSrc + 'resEmail.png')" alt="">
              <el-form-item class="register-form-item" label-width="65px" label="邮箱" prop="userEmail">
                <el-input class="register-form-item-input" v-model="refFormOne.userEmail" />
              </el-form-item>
            </div>
            <div class="formNameClass">
              <img :src="(imgIconSrc + 'resDate.png')" alt="">
              <el-form-item class="register-form-item" label="生日" label-width="65px" prop="userBirthday" required>
                <el-col :span="24">
                  <el-form-item>
                    <el-date-picker v-model="refFormOne.userBirthday" type="date" size="large" label="生日"
                      format="YYYY/MM/DD" value-format="YYYY-MM-DD" placeholder="2022-11-08" />
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>
            <div class="form-submit-one">
              <el-button class="formButtonNext" type="primary" @click="oneNext">下一步</el-button>
              <el-button class="formButtonReset" @click="resetForm(refOne)">重置</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-collapse-transition>

    <el-collapse-transition name="el-fade-in">
      <div class="right-two" :style="[
        { width: rightTwo ? 504 + 'px' : 0 + 'px' },
      ]">
        <el-icon @click="rightTwo = !rightTwo" class="right-icon" :size="40">
          <component :is='rightTwo ? "ArrowRight" : "ArrowLeft"' />
        </el-icon>
        <div class="register-right-two">
          <div>relinex</div>
          <el-form ref="refTwo" :model="refFormTwo" :rules="twoRules" label-width="100px" class="register-form-two"
            :size="formSize" status-icon>
            <div class="formNameClass">
              <img :src="(imgIconSrc + 'password.png')" alt="">
              <el-form-item class="register-form-item" label="密码  " required label-width="110px" prop="userPassword">
                <el-input type="password" class="register-form-item-input" v-model="refFormTwo.userPassword" />
              </el-form-item>
            </div>
            <div class="formNameClass">
              <img :src="(imgIconSrc + 'password.png')" alt="">
              <el-form-item class="register-form-item" label="确认密码" required label-width="110px">
                <el-input type="password" class="register-form-item-input" v-model="passwordToo" />
              </el-form-item>
            </div>
            <div class="form-submit-one">
              <el-button class="formButtonNext" @click="twoLast">上一步</el-button>
              <el-button class="formButtonLast" type="primary" @click="twoNext">下一步</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-collapse-transition>

    <el-collapse-transition name="el-fade-in">
      <div class="right-three" :style="[
        { width: rightThree ? 504 + 'px' : 0 + 'px' },
      ]">
        <el-icon @click="rightThree = !rightThree" class="right-icon" :size="40">
          <component :is='rightThree ? "ArrowRight" : "ArrowLeft"' />
        </el-icon>
        <div class="register-right-three">
          <div>relinex</div>
          <el-form ref="refThree" :model="refFormThree" :rules="threeRules" label-width="100px"
            class="register-form-three" :size="formSize" status-icon>
            <el-upload
                class="avatar-uploader"
                action="http://relinex.cn:801/wx/snow/user/head"
                :show-file-list="false"
                :data="{ userPhone: refFormOne.userPhone }"
                name="headImg"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-error="handleAvatarError">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
            <div class="formNameClass" style="margin-top: 30px">
              <img :src="(imgIconSrc + 'nickName.png')" alt="">
              <el-form-item class="register-form-item" label="昵称" label-width="65px" required prop="userNickname">
                <el-input class="register-form-item-input" v-model="refFormThree.userNickname" />
              </el-form-item>
            </div>
            <div class="formNameClass" style="margin-top: 10px">
              <img :src="(imgIconSrc + 'about.png')" alt="">
              <el-form-item class="register-form-item" label="简介" label-width="65px" prop="userAbout">
                <el-input v-model="refFormThree.userAbout" :rows="4" type="textarea" maxlength="80" :clearable='true'
                  :show-word-limit='true' size="large" placeholder="输入一段话介绍自己！" />
              </el-form-item>
            </div>
            <div class="form-submit-one">
              <el-button class="formButtonNext" @click="threeLast">上一步</el-button>
              <el-button class="formButtonNext" type="primary" @click="submitForm(refOne, refTwo, refThree)">提交
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts" setup>
import { EluiChinaAreaDht } from 'elui-china-area-dht'
import { globalStore } from "@/store/global/global";
import { storeToRefs } from "pinia";
import { reactive, ref } from 'vue'
import type { FormInstance,UploadFile, FormRules } from 'element-plus'
import { registerOne } from "@/api/userApi/userApi";
import { encryption, decrypt } from '@/utils/RSAUtil'
import { GetOs, GetCurrentBrowser } from "@/utils/systemTool";
import { ElMessage } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import { register } from "@/api/userApi/userApi";
import { toRaw } from '@vue/reactivity'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { useRouter } from "vue-router";
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat

const { imgIconSrc } = storeToRefs(globalStore())

const rightOne = ref(true)
const rightTwo = ref(false)
const rightThree = ref(false)


const formSize = ref('default')
const refOne = ref<FormInstance>()
const refTwo = ref<FormInstance>()
const refThree = ref<FormInstance>()
const refFormOne = reactive({
  userName: '',
  userSex: '',
  userPhone: '',
  userEmail: '',
  userBirthday: '',
  userAddress: ''
})
const refFormTwo = reactive({
  userPassword: ''
})
const refFormThree = reactive({
  userNickname: '',
  userAbout: ''
})

const addressName = (china: object, data: string) => {
  let string = ''
  for (let i = 0; i < 3; i++) {
    let index = searching(data[i], Object.keys(china))
    string += Object.values(china)[index].label
  }
  return string
}

const searching = (target: string, obj: Array<string>) => {
  let start = 0, end = obj.length, middle, element;
  while (start <= end) {
    middle = Math.floor((start + end) / 2)
    element = obj[middle]
    if (element === target) {
      return middle
    } else if (target < element) {
      end = middle - 1
    } else {
      start = middle + 1
    }
  } return -1
}

const nameZ = /^[\u4e00-\u9fa5]{2,10}$/
const phoneZ = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
const passwordZ = /^[a-zA-Z0-9_.@]{6,16}$/
const emailZ = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
const nickNameZ = /^[\u4e00-\u9fa5a-zA-Z0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]{1,10}$/
const aboutZ = /^[\u4e00-\u9fa5a-zA-Z0-9`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]{1,80}$/

const oneRules = reactive<FormRules>({
  userName: [
    { required: true, message: '不能为空', trigger: 'blur' },
    {
      min: 2, max: 10, message: '必须为中文且2-10位', trigger: 'blur',
      pattern: nameZ
    }
  ],
  userPhone: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur',
    },
    {
      message: '请输入正确的电话号', trigger: 'blur',
      pattern: phoneZ
    }
  ],
  userBirthday: [
    {
      type: 'date',
      required: true,
      message: '请选择生日',
      trigger: 'blur',
    }
  ],
  userAddress: [
    {
      required: true,
      message: '请选择地址',
      trigger: 'blur',
    }
  ]
})
const twoRules = reactive<FormRules>({
  userPassword: [
    { required: true, message: '不能为空', trigger: 'blur' },
    {
      min: 6, max: 18, message: '6~18位,且只能是字母、数字、下划线、小数点和@符号', trigger: 'blur',
      pattern: passwordZ
    }
  ]
})
const threeRules = reactive<FormRules>({
  userNickname: [
    { required: true, message: '不能为空', trigger: 'blur' },
    {
      min: 1, max: 10, message: '1-10位字符', trigger: 'blur',
      pattern: nickNameZ
    }
  ],
  userAbout: [
    {
      min: 1, max: 80, message: '1-80位字符', trigger: 'change',
      pattern: aboutZ
    }
  ]
})

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

const twoLast = () => {
  rightOne.value = true
  rightTwo.value = false
  rightThree.value = false
}

const threeLast = () => {
  rightOne.value = false
  rightTwo.value = true
  rightThree.value = false
}

const oneNext = () => {
  if (refFormOne.userEmail !== '') {
    if (!emailZ.test(refFormOne.userEmail)) {
      ElMessage({
        showClose: true,
        message: "邮箱格式错误",
        type: 'error',
      })
      return
    }
  }
  if (refFormOne.userName !== '' && refFormOne.userSex !== ''
    && refFormOne.userPhone !== ''
    && refFormOne.userBirthday !== ''
    && refFormOne.userAddress !== '') {

    registerOne({
      userPhone: refFormOne.userPhone,
      loginIp: cip.value,
      loginCity: cityName.value,
      loginBrowser: GetCurrentBrowser().browser + ' ' + GetCurrentBrowser().version,
      loginOs: GetOs()
    }).then((res)=>{
        if(res.data.code === 20000){
          rightOne.value = false
          rightTwo.value = true
          rightThree.value = false
        }else{
          ElMessage({
            showClose: true,
            message: "表单校验为通过，请检查表单，重新填写!",
            type: 'error',
          })
        }
    }).catch((error)=>{
      ElMessage({
        showClose: true,
        message: "发生异常错误",
        type: 'error',
      })
    });
  } else {
    ElMessage({
      showClose: true,
      message: "必填项为空",
      type: 'error',
    })
  }
}

const passwordToo = ref('')

const twoNext = () => {
  if (refFormTwo.userPassword !== '' && passwordToo.value !== '') {
    //验证两次密码一致性
    if (refFormTwo.userPassword !== passwordToo.value) {
      ElMessage({
        showClose: true,
        message: '两次密码输入不一致，请重新输入！',
        type: 'error',
      })
    } else {
      rightOne.value = false
      rightTwo.value = false
      rightThree.value = true
    }
  } else {
    ElMessage({
      showClose: true,
      message: "密码不能为空",
      type: 'error',
    })
  }
}
const router = useRouter()

const submitForm = async (oneRef: FormInstance | undefined, twoRef: FormInstance | undefined, threeRef: FormInstance | undefined) => {
  if (!oneRef || !twoRef || !threeRef) return
  oneRef.validate((valid, fields) => {
    if (valid) {
      twoRef.validate((valid, fields) => {
        if (valid) {
          threeRef.validate((valid, fields) => {
            if (valid) {

              if (refFormThree.userNickname !== '') {
                if (refFormThree.userAbout === '') {
                  refFormThree.userAbout = "这个家伙很懒，什么都没留下!"
                }
                refFormOne.userAddress = addressName(chinaData, refFormOne.userAddress)
                console.log(refFormOne.userAddress)
                register({
                  userName: refFormOne.userName,
                  userSex: refFormOne.userSex,
                  userPhone:refFormOne.userPhone,
                  userEmail: refFormOne.userEmail,
                  userBirthday: refFormOne.userBirthday,
                  userAddress: refFormOne.userAddress,
                  userPassword: refFormTwo.userPassword,
                  userNickname:refFormThree.userNickname,
                  userAbout: refFormThree.userAbout,
                }).then((res) => {
                  if (res.data.code === 20000) {
                    ElMessage({
                      showClose: true,
                      message: res.data.message,
                      type: 'success',
                    })
                    router.push({
                      name: 'login'
                    })
                  } else {
                    ElMessage({
                      showClose: true,
                      message: res.data.message,
                      type: 'error',
                    })
                  }
                }).catch((err: any) => {
                  console.log(err)
                })
              } else {
                ElMessage({
                  showClose: true,
                  message: "请输入昵称",
                  type: 'error',
                })
              }
            } else {
              console.log('error submit!', fields)
            }
          })
        } else {
          console.log('error submit!', fields)
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (ruleFormRef: FormInstance | undefined) => {
  if (!ruleFormRef) return
  ruleFormRef.resetFields();
}

const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  ElMessage({
    showClose: true,
    message: response,
    type: 'success',
  })
}
const handleAvatarError: UploadProps['onError'] = (
  response: any,
) => {
  ElMessage({
    showClose: true,
    message: response.data,
    type: 'success',
  })
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/jpg') {
    ElMessage.error('图片格式只支持image/jpeg/png/jpg')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('头像大小不能超过4MB!')
    return false
  }
  return true
}
</script>

<style scoped>
.bodyRegisterClass {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: 100%;
}

.leftIcon {
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

.right {
  position: absolute;
  right: 12px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  min-height: 510px;
  transition: width 1.5s;
  overflow: hidden;
  z-index: 1;
}

.right>.right-icon {
  min-width: 40px;
  min-height: 60px;
  border-radius: 3px;
  cursor: pointer;
  transition: right 1.5s;
  background-color: rgba(241, 235, 235, 0.81);
  z-index: 101;
}

.right>.register-right {
  margin-right: 3px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 460px;
  min-height: 510px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 0 5px 1px #999;
  z-index: 100;
}

.register-right>div {
  text-align: center;
  width: 100%;
  min-height: 70px;
  font-size: 50px;
  color: rgb(18, 150, 219);
}

.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-width: 340px;
  min-height: 400px;
}

.register-form>.formNameClass {
  min-width: 320px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.register-form>.formNameClass>img {
  width: 40px;
  height: 40px;
}

.register-form-item {
  min-width: 280px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  --font-size: 19px;
}

.register-form-item-input {
  width: 220px;
  min-height: 42px;
  font-size: 16.5px;
}

.register-form>.form-submit-one {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
}

.register-form>.form-submit-one>.formButtonNext {
  min-width: 125px;
  min-height: 40px;
  font-size: 17px;
  letter-spacing: 4px;
}

.register-form>.form-submit-one>.formButtonReset {
  min-width: 125px;
  min-height: 40px;
  font-size: 17px;
  letter-spacing: 4px;
}

.right-two {
  position: absolute;
  right: 12px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  min-height: 400px;
  transition: width 1.5s;
  overflow: hidden;
  z-index: 1;
}

.right-two>.right-icon {
  min-width: 40px;
  min-height: 60px;
  border-radius: 3px;
  cursor: pointer;
  transition: right 1.5s;
  background-color: rgba(241, 235, 235, 0.81);
  z-index: 101;
}

.register-right-two {
  margin-right: 3px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-width: 460px;
  min-height: 400px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 0 5px 1px #999;
  z-index: 100;
}

.register-right-two>div {
  text-align: center;
  width: 100%;
  min-height: 70px;
  font-size: 50px;
  color: rgb(18, 150, 219);
}

.register-form-two {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-width: 340px;
  min-height: 240px;
}

.register-form-two>.formNameClass {
  min-width: 320px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.register-form-two>.formNameClass>img {
  width: 40px;
  height: 40px;
}

.register-form-item {
  min-width: 280px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  --font-size: 19px;
}

.register-form-item-input {
  width: 220px;
  min-height: 42px;
  --font-size: 19px;
}

.register-form-two>.form-submit-one {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
}

.register-form-two>.form-submit-one>.formButtonNext {
  min-width: 125px;
  min-height: 40px;
  font-size: 17px;
  letter-spacing: 4px;
}

.register-form-two>.form-submit-one>.formButtonLast {
  min-width: 125px;
  min-height: 40px;
  font-size: 17px;
  letter-spacing: 4px;
}

.right-three {
  position: absolute;
  right: 12px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  min-height: 500px;
  transition: width 1.5s;
  overflow: hidden;
  z-index: 1;
}

.right-three>.right-icon {
  min-width: 40px;
  min-height: 60px;
  border-radius: 3px;
  cursor: pointer;
  transition: right 1.5s;
  background-color: rgba(241, 235, 235, 0.81);
  z-index: 101;
}

.register-right-three {
  margin-right: 3px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-width: 460px;
  min-height: 500px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 0 5px 1px #999;
  z-index: 100;
}

.register-right-three>div {
  text-align: center;
  width: 100%;
  min-height: 70px;
  font-size: 50px;
  color: rgb(18, 150, 219);
}

.register-form-three {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-width: 340px;
  min-height: 380px;
}

.register-form-three>.formNameClass {
  min-width: 320px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.register-form-three>.formNameClass>img {
  width: 40px;
  height: 40px;
}

.register-form-item {
  min-width: 280px;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0;
  --font-size: 19px;
}

.register-form-item-input {
  width: 220px;
  min-height: 42px;
  --font-size: 19px;
}

.register-form-three>.form-submit-one {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 15px;
}

.register-form-three>.form-submit-one>.formButtonNext {
  min-width: 125px;
  min-height: 40px;
  font-size: 17px;
  letter-spacing: 4px;
}

.register-form-three>.form-submit-one>.formButtonLast {
  min-width: 125px;
  min-height: 40px;
  font-size: 17px;
  letter-spacing: 4px;
}

.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>