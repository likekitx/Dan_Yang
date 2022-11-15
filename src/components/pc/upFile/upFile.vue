<template>
  <div class="upFileOut">
    <el-upload
        ref="uploadRef"
        class="upload-demo"
        drag
        :auto-upload="false"
        name="headImg"
        action="http://relinex.cn:801/wx/snow/user/upFile"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :data="{ do: loginUserIndex.userId,rad:radio,name: form.name,introduce:form.introduce}"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        点击或将文件拖拽至此都可上传
      </div>
    </el-upload>
    <div class="formClass">
      <el-form
          ref="refForm"
          label-width="100px"
          :rules="formRules"
          class="elFormClass"
          :model="form">
        <el-radio-group
            v-model="radio"
            class="ml-4">
          <el-radio :label="1">头像</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
        <el-form-item
            required
            prop="name"
            class="formItemClass"
            label-width="110px"
            label="文件的名称(主题)">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
            required
            prop="introduce"
            class="formItemClass"
            label-width="110px"
            label="文件的内容(文案)">
          <el-input v-model="form.introduce" />
        </el-form-item>
        <div class="submitClass">
          <el-button class="buttonSubmit" type="primary" @click="submitUpload">点击上传</el-button>
        </div>
      </el-form>
    </div>
    <div class="rightIcon">
      <i class="iconfont icon-changjiantou-zuoshang"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import { loginStore } from '@/store/login/loginStore'
import { storeToRefs } from 'pinia'
import type { UploadInstance,FormRules, FormInstance } from 'element-plus'
import {ElMessage, UploadProps} from "element-plus";
const uploadRef = ref<UploadInstance>()
const { loginUserIndex } = storeToRefs(loginStore())

const form = reactive({
  name: '',
  introduce: ''
})
const radio = ref(1)
const refForm = ref<FormInstance>()
const submitUpload = () => {
  if(form.name !== '' && form.introduce !== ''){
    uploadRef.value!.submit()
  }else {
    ElMessage({
      type:'error',
      message:'输入框不能为空'
    })
  }
}

const nickNameZ = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/
const aboutZ = /^[\u4e00-\u9fa5a-zA-Z0-9，。]{1,40}$/

const formRules = reactive<FormRules>({
  name: [
    { required: true, message: '不能为空', trigger: 'blur' },
    {
      min: 1, max: 20, message: '1-20位字符', trigger: 'blur',
      pattern: nickNameZ
    }
  ],
  introduce: [
    { required: true, message: '不能为空', trigger: 'blur' },
    {
      min: 1, max: 40, message: '1-40位字符', trigger: 'change',
      pattern: aboutZ
    }
  ]
})
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  ElMessage({
    showClose: true,
    message: response,
    type: 'success',
  })
  form.introduce = ''
  form.name = ''
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
</script>

<style scoped>
.upFileOut{
  position: absolute;
  width: 87.4%;
  top: 8.5%;
  left: 11%;
  height: 90.8%;
}
.upload-demo{
  width: 100%;
  height: 50%;
}
:deep(.el-upload){
  width: 100%;
  height: 100%;
}
:deep(.el-upload-dragger){
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
:deep(.el-icon){
  font-size: 100px;
}
:deep(.el-upload__text){
  color: #636363;
  font-size: 22px;
  font-weight: bold;
  font-family: STKaiti,serif;
}
@font-face {
  font-family: "iconfont"; /* Project id 3772880 */
  src: url('//at.alicdn.com/t/c/font_3772880_enm3345lawr.woff2?t=1668514658717') format('woff2'),
  url('//at.alicdn.com/t/c/font_3772880_enm3345lawr.woff?t=1668514658717') format('woff'),
  url('//at.alicdn.com/t/c/font_3772880_enm3345lawr.ttf?t=1668514658717') format('truetype');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 180px;
  color: #1296db;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-changjiantou-zuoshang:before {
  content: "\e7cc";
}
:deep(.el-upload-list){
  width: 30%;
  cursor: pointer;
}
.formClass{
  position: absolute;
  bottom: 10%;
  left: 30%;
  width: 50%;
  height: 40%;
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.elFormClass{
  /*border: 1px solid black;*/
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
}
.formItemClass{
  width: 80%;
  height: 24%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
:deep(.el-form-item__label){
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80%;
  font-size: 17px;
  font-weight: bold;
  font-family: STKaiti,serif;
}
:deep(.el-form-item__content){
  width: 70%;
  height: 80%;
}
:deep(.el-input){
  height: 100%;
}
:deep(.el-input__wrapper){
  border-radius: 7px;
}
:deep(.el-input__inner){
  height: 90%;
  font-size: 20px;
  font-weight: bold;
  font-family: STKaiti,serif;
}
.ml-4{
  width: 80%;
  height: 20%;
  /*border: 1px solid black;*/
}
:deep(.el-radio){
  width: 9%;
  height: 100%;
}
:deep(.el-radio__label){
  font-size: 20px;
  font-weight: bold;
  font-family: STKaiti,serif;
}
.rightIcon{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10%;
  height:20%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: flex-end;
}
.submitClass{
  width: 79%;
  height: 18%;
  margin-left: 1%;
}
.buttonSubmit{
  width: 100%;
  height: 100%;
  font-size: 24px;
  letter-spacing: 3px;
  font-weight: bold;
  font-family: STKaiti,serif;
  border-radius: 3px;
}
</style>