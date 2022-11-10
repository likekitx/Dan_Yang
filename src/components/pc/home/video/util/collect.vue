<template>
  <div @click="isLike = !isLike">
    <transition :name=" isLike ? 'zoom' : '' " mode="out-in">
      <img src="/public/img/collect.svg" color="#FF0000" v-if="isLike" key="like"/>
      <img src="/public/img/unlike.svg" color="#333333" v-else key="unlike"/>
    </transition>
  </div>
</template>

<script >
</script>

<style scoped>

</style>