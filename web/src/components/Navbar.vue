<template>
  <div>
    <el-menu
      :default-active="route.fullPath"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item v-for="(item, index) in menuList" :index="item.path">
        {{ item.label }}
      </el-menu-item>
      <el-menu-item index=" " @click="handleClick">登录</el-menu-item>
    </el-menu>
    <div class="right">企业门户网站</div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const menuList = [
  { label: "首页", path: "/" },
  { label: "新闻中心", path: "/news" },
  { label: "产品与服务", path: "/product" },
];
</script>
<style scoped lang="scss">
.el-menu {
  position: sticky;
  top: 0;
  z-index: 1000;
}
.right {
  position: fixed;
  top: 0;
  right: 20px;
  width: 100px;
  height: 59px;
  line-height: 59px;
  text-align: center;
  z-index: 10000;
}
</style>