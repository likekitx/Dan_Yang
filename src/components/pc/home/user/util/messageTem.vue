<template>
  <div class="publicTemClass">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{headMessage}}</span>
          <el-button class="button" text>全部消息</el-button>
        </div>
      </template>
      <el-card class="cardLoad">
        <div v-for="o in 20" :key="o" class="text item">{{ 'List item ' + o }}</div>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>

const props =defineProps({
  headMessage:String
})
const headMessage = props.headMessage
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header span{
  font-size: 24px;
  font-family: “Microsoft YaHei”,sans-serif;
  font-weight: bold;
  color: #6c6c6f;
  -webkit-font-smoothing:none;
}
.el-button>span{
  font-size: 15px;
}
.item {
  border: 1px solid black;
}
.box-card {
  width: 287px;
  max-height: 450px !important;
}
.publicTemClass{
  position: absolute;
  top: 49px;
  padding-top: 15px !important;
  right: 51px;
  z-index: 100;
  cursor: pointer;
  /*border: 1px solid black;*/
  width: 291px;
  height: 474px;
}
.cardLoad{
  max-height: 381px;
  overflow-y: auto !important;
}
.el-card__body{
  padding: 0 !important;
  border-radius: 0!important;
}
</style>