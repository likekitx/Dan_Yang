<template>
  <div class="searchHeader">
    <el-input
        class="searchInput"
        v-model="searchInput"
        type="string"
        maxlength="10"
        minlength="1"
        :size="30"
        clearable="true"
        @focus="onFocusClear"
        @blur="onBlurClear"
        placeholder="搜索你感兴趣的内容">
      <template #prefix>
        <el-icon :size="25">
          <search />
        </el-icon>
      </template>
      <template #append>
        <div
            class="searchAppend"
            @mousedown="searchAppendMousedown"
            @mouseup="searchAppendMouseup">
          <el-icon :size="22" class="searchAppendIcon">
            <search />
          </el-icon>
          <span class="searchText">搜索</span>
        </div>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import { globalStore } from '@/store/global/global'
import {storeToRefs} from "pinia";

//输入框内容
const searchInput = ref('')

</script>

<style scoped>
.searchHeader{
  /*border: 1px solid black;*/
  width: 28%;
  height: 5.5%;
  position: absolute;
  top: 0.7%;
  left: 12.4%;
}
.searchInput{
  width: 100%;
  height: 100%;
  font-size: 16px;
  letter-spacing: 2px;
  position: relative;
}
.searchAppend{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 17px;
  font-family:Arial,Helvetica,sans-serif;
  color: black;
  cursor: pointer;
}
.searchAppend:hover{
  color: #c586f2;
}
.searchText{
  margin-left: 10px;
  text-align: center;
  padding-top: 3px;
}
:deep(.el-input__clear){
  font-size: 24px;
}
</style>