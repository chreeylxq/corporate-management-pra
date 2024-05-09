<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :on-change="handleChange"
    :auto-upload="false"
  >
    <img v-if="props.avatar" :src="avatarUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>
<script setup>
import { defineEmits, defineProps, computed } from "vue";
import { Plus } from "@element-plus/icons-vue";

//接收父组件传过来的值
const props = defineProps({
  avatar: String,
});

//父组件监听事件
const emit = defineEmits(["changeAvatar"]);

//显示头像
let avatarUrl = computed(() =>
  props.avatar.includes("blob")
    ? props.avatar
    : "http://localhost:3000" + props.avatar
);

//每次选择完图片后触发的方法
let handleChange = (file) => {
  //   userForm.avatar = window.URL.createObjectURL(file.raw); //本地回显
  //   userForm.file = file.raw; //提交给后端

  emit("changeAvatar", file.raw);
};
</script>
<style lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>