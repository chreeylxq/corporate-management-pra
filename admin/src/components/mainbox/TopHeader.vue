<template>
  <el-header>
    <div class="left">
      <el-icon><Menu @click="changeSideMenuState" /></el-icon>
      <span>企业门户网站管理系统</span>
    </div>
    <div class="right">
      <span>欢迎 {{ store.state.userInfo.username }}回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon size="20"><User /></el-icon>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout"
              >退&nbsp;&nbsp;出</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
  <!-- <button @click="changeSideMenuState">click</button> -->
</template>
<script setup>
import { useStore } from "vuex";
import { User, Menu } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const changeSideMenuState = () => {
  store.commit("changeCollapseState");
};

const handleCenter = () => {
  router.push("/center");
};

const handleLogout = () => {
  router.push("/login");
  store.commit("clearUserInfo");
  localStorage.removeItem("token");
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #2d3a4b;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    font-size: 20px;
    span {
      margin-left: 5px;
    }
    .el-icon {
      cursor: pointer;
    }
  }
  .right {
    span {
      margin-right: 5px;
    }
  }
  .el-icon {
    color: white;
  }
}
</style>