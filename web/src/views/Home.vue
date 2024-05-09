<template>
  <div class="container">
    <el-carousel height="calc(100vh - 59px)">
      <el-carousel-item v-for="(item, index) in homePicList" :key="index">
        <div
          :style="{
            backgroundImage: ` url(${require(`@/assets/${item.picName}`)}) `,
          }"
        ></div>
        <h1 text="2xl">{{ item.centerWord }}</h1>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup>
const homePicList = [
  { picName: "home1.jpeg", centerWord: "互联网 + 时代" },
  { picName: "home2.jpeg", centerWord: "互联网 + 时代" },
  { picName: "home3.jpeg", centerWord: "互联网 + 时代" },
];
</script>
<style scoped lang="scss">
.el-carousel div {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.container {
  position: relative;
}
.el-carousel h1 {
  position: absolute;
  color: #f8f8f8;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>