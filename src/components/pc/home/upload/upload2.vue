<template>
<el-upload
                class="upload-demo"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
                :before-upload="beforeUploadVideo"
                :on-success="dragVideo"
            >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
               <em>拖动视频/图片以上传文件</em>
                </div>
                <template #tip>
                <div class="el-upload__tip">
                  <el-button type="primary" style="width:180px; height: 60px; float: right;" @click="goUpload3">上传!</el-button>
                </div>
                </template>
            </el-upload>
</template>
<script setup lang="ts">
import router from '@/router'
const goUpload3=()=>{
    router.push({path:'upload/upload3'})
}
</script>
<style lang="scss" scoped>
.upload-demo{
    border-radius: 7px;
    box-shadow: 0px 0px 8px 3px rgba(0,0,0,0.2);
    height: 62%;
  }
  ::v-deep .el-upload{
  width: 100%;
  height: 80%;
}
::v-deep .el-upload .el-upload-dragger{
  width: 100%;
  height: 100%;
}
</style>