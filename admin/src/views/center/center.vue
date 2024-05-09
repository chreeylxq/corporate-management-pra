<template>
  <div>
    <el-page-header
      :icon="null"
      title="企业门户网站管理系统"
      content="个人中心"
    ></el-page-header>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div>
            <el-avatar :src="avatarUrl" :size="80" style="font-size: 50px" />
          </div>
          <div>{{ store.state.userInfo.username }}</div>
          <div class="role">{{ roleUrl }}</div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="userFormRef"
            :model="userForm"
            status-icon
            :rules="userRules"
            label-width="auto"
            class="demo-ruleForm"
          >
            <el-form-item
              label="用户名"
              prop="username"
              :placeholder="username"
            >
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="userForm.gender" placeholder="请选择性别">
                <el-option
                  v-for="item in options"
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
              />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <Upload
                :avatar="userForm.avatar"
                @changeAvatar="handleChange"
              ></Upload>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit"
                style="margin-left: 80px"
                >更新</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import Upload from "@/components/upload/upload.vue";
import upload from "@/utils/upload";
import { ElMessage } from "element-plus";

const store = useStore();
let { username, gender, introduction, avatar, role } = store.state.userInfo;

let avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);
const userFormRef = ref();

let roleUrl = computed(() => (role === 1 ? "管理员" : "编辑"));
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
});

const userRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  introduction: [{ required: true, message: "请输入简介", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
//选择性别
const options = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

//每次选择完图片后触发的方法
let handleChange = (file) => {
  userForm.avatar = window.URL.createObjectURL(file); //本地回显
  userForm.file = file; //提交给后端
};

//更新提交
let onSubmit = () => {
  userFormRef.value.validate(async (valid) => {
    //validate 触发校验
    if (valid) {
      //提交之后发送的 request 中的userForm信息，其中含有File，不能直接作为参数，应该生成一个formData
      //upload 封装
      let res = await upload("/adminapi/user/upload", userForm);
      if (res.code === 0) {
        //数据库update成功，持久化到vuex中
        store.commit("changeUserInfo", res.data);
        ElMessage.success(res.msg);
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
.el-card__body:nth-of-type(1) {
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    text-align: center;
    font-weight: 700;
  }
  .role {
    font-size: 13px;
  }
}
</style>