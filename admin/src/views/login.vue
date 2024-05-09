<template>
  <div>
    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form
        ref="loginFormRef"
        style="max-width: 600px"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="auto"
        class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            autocomplete="off"
            style="width: 280px"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
            style="width: 280px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)">
            登录
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const loginForm = reactive({
  username: "",
  password: "",
}); //表单绑定的响应式对象

const loginFormRef = ref(); //表单的引用对象

//表单校验规则
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

//提交表单函数
const submitForm = () => {
  //1. 校验表单
  //validate 任意表单项被校验后触发
  loginFormRef.value.validate((valid) => {
    if (valid) {
      //数据提交后端接口
      axios.post("/adminapi/user/login", loginForm).then((res) => {
        if (res.data.code === 0) {
          //存储数据到vuex
          store.commit("changeUserInfo", res.data.data);
          store.commit("changeGetterRouter", false);
          //成功登录成功 路由跳转
          router.push("/index");
        } else if (res.data.code === -1) {
          //用户名或密码错误 弹出提示框
          ElMessage({
            message: "用户名或密码错误！",
            type: "error",
            plain: true,
          });
        }
      });
    }
  });
};
//重置表单
const resetForm = () => {};
</script>
<style lang="scss" scoped>
.formContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  border-radius: 20px;
}
::v-deep .el-form-item__label {
  color: white;
}
h3 {
  position: absolute;
  font-size: 30px;
  top: 20px;
}
</style>
