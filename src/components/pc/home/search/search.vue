<template>
  <div class="searchHeader">
    <el-input
        class="searchInput"
        v-model="searchInput"
        type="string"
        maxlength="10"
        minlength="1"
        :clearable=true
        @change="searchData"
        @input="searchInputEvent"
        @focus="cardFocus"
        @blur="cardBlur"
        placeholder="搜索你感兴趣的内容">
      <template #prefix>
        <el-icon :size="25">
          <search />
        </el-icon>
      </template>
      <template #append>
        <div
            class="searchAppend"
            @click="searchData"
            @mousedown="iconSize = !iconSize"
            @mouseup="iconSize = !iconSize">
          <el-icon
              style="transition: 0.1s"
              :size="(iconSize ? 28 : 22)"
              :color= "iconSize ? '#c586f2' : 'black'">
            <search />
          </el-icon>
          <span
              :style="[{color: iconSize ? '#c586f2' : 'black' }]"
              class="searchText">搜索</span>
        </div>
      </template>
    </el-input>
  </div>
  <div
      :style="[
            {display: isDisplay ? 'inline' : 'none'},
            {height: isFocus ? '249px' : '0' }
        ]"
      class="searchHint">
    <el-card
        class="searchCard">
      <div
          @mouseenter="cardOver(index)"
          :class="{backCardDiv: index === minIndex}"
          :key="index"
          @click="inSearchData(searchInputEventList)"
          v-for="(searchInputEventList,index) in searchInputEventList"
          class="searchCardDiv">
        <span>{{searchInputEventList}}</span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import { globalStore } from '@/store/global/global'
import {storeToRefs} from "pinia";

const minIndex = ref()
const cardOver = (index:number)=>{
  minIndex.value = index
}
const iconSize = ref(false)
const cardFocus = ()=>{
  isDisplay.value = true
  setTimeout(function () {
    isFocus.value = true
  },100)
}
const cardBlur = ()=>{
  isFocus.value = false
  setTimeout(function () {
    isDisplay.value = false
  },300)
}
const searchInputEvent = (data:string | number)=>{
  console.log(data)
}
const searchData = ()=>{
  console.log(searchInput.value)
  isFocus.value = false
  setTimeout(function () {
    isDisplay.value = false
  },300)
}
const isFocus = ref(false)
const isDisplay = ref(false)
//输入框内容
const searchInput = ref('')
const searchInputEventList = ref([
    "王雪",
    "王雪",
    "王雪",
    "王雪",
    "王雪",
    "王雪",
])
const inSearchData = (data:string)=>{
  searchInput.value = data
}
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
}
.searchAppend{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: pointer;
}
:deep(.el-input-group__append){
  width: 20%;
  padding: 0;
}
:deep(.el-input__inner){
  font-size: 18px;
  font-weight: bold;
  font-family: STKaiti,Helvetica,sans-serif;
}
.searchText{
  margin-left: 4px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  font-family: SimSun, sans-serif;
  padding-top: 1px;
}
:deep(.el-input__clear){
  font-size: 24px;
}
.searchHint{
  z-index: 4;
  width: 28%;
  position: absolute;
  top: 6.3%;
  left: 12.4%;
  transition: 0.4s;
  background-color: white;
}
.searchCard{
  width: 100%;
  height: 100%;
  margin-top: 2px;
  border-radius: 3px;
}
.searchCardDiv{
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  font-family: STFangsong, sans-serif;
  /*border: 1px solid #ffffff;*/
}
.searchCardDiv:first-child{
  margin-top: 6px;
}
.searchCardDiv span{
  margin-left: 8%;
}
.backCardDiv{
  background-color: #eae9e9;
}
:deep(.el-card__body){
  padding: 0;
}
</style>