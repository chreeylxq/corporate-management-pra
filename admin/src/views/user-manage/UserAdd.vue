<template>
  <div>
    <el-page-header
      :icon="null"
      title="用户管理"
      content="添加用户"
    ></el-page-header>

    <el-form
      ref="userFormRef"
      :model="userForm"
      status-icon
      :rules="userRules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="userForm.password"
          placeholder="请输入密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="userForm.role" placeholder="请选择角色">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介" prop="introduction">
        <el-input
          v-model="userForm.introduction"
          type="textarea"
          :rows="5"
          placeholder="请输入简介"
        />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <Upload :avatar="userForm.avatar" @changeAvatar="handleChange"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="margin-left: 80px"
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import Upload from "@/components/upload/upload.vue";
import upload from "@/utils/upload";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const route = useRouter();

const userFormRef = ref();
const userForm = reactive({
  username: "",
  password: "",
  role: 2, //1 管理员 2 普通 有编辑
  gender: 0,
  introduction: "",
  avatar: "",
  file: null,
});
//选择角色
const roles = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "编辑",
    value: 2,
  },
];

const userRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "bulr" }],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
  introduction: [{ required: true, message: "请输入简介", trigger: "blur" }],
});

//每次选择完图片后触发的方法
let handleChange = (file) => {
  userForm.avatar = window.URL.createObjectURL(file); //本地回显
  userForm.file = file; //提交给后端
};

let onSubmit = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      //提交数据到后台
      let res = await upload("/adminapi/user/addUser", userForm);
      console.log(res);
      if (res.code === 0) {
        //路由跳转到user-list
        ElMessage.success(res.msg);
        route.push("/user-manage/userList");
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.el-page-header {
  margin-bottom: 50px;
}
.el-page-header__title {
  font-size: 15px;
  font-weight: 400;
}
</style>