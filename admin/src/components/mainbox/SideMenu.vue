<template>
  <el-aside
    :width="$store.state.isCollapse ? '64px' : '200px'"
    :collapse-transition="false"
  >
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      :collapse="$store.state.isCollapse"
      router="true"
      :default-active="route.fullPath"
    >
      <el-menu-item index="/index">
        <el-icon><HomeFilled /></el-icon><span @click="toHome">首 页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><Avatar /></el-icon><span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon><UserFilled /></el-icon><span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user-manage/addUser">添加用户</el-menu-item>
          <el-menu-item index="/user-manage/userList">用户列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon> <MessageBox /> </el-icon> <span>新闻管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/news-manage/addNews">添加news</el-menu-item>
          <el-menu-item index="/news-manage/newsList">news列表</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/product-manage">
        <template #title
          ><el-icon><Reading /></el-icon><span>产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product-manage/addProduct"
            >添加产品</el-menu-item
          >
          <el-menu-item index="/product-manage/productList"
            >产品列表</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<script setup>
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Pointer,
  Reading,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const store = useStore();

//用户权限，若用户不是管理员，则不现实用户管理路由
const vAdmin = {
  mounted: (el) => {
    if (store.state.userInfo.role !== 1) {
      el.parentNode.removeChild(el);
    }
  },
};
let toHome = () => {
  axios.post("/adminapi/user/home").then((res) => {
    console.log(res);
  });
};
</script>
<style setup>
.el-aside {
  height: 100vh;
  transition-property: width;
  transition-duration: 0.15s;
  transition-timing-function: linear;
}
</style>