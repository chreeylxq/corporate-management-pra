<template>
  <div>
    <el-page-header
      @back="handleBack"
      title="新闻管理"
      content="编辑新闻"
    ></el-page-header>
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      status-icon
      :rules="newsRules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor
          v-if="newsForm.content"
          @event="getNewsContent"
          :content="newsForm.content"
        ></editor>
        <span v-if="!newsForm.content" style="color: red"
          >编辑内容丢失,请重新创建新闻</span
        >
      </el-form-item>

      <el-form-item label="类别" prop="category">
        <el-select v-model="newsForm.category" placeholder="请选择类别">
          <el-option
            v-for="item in categorys"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片" prop="cover">
        <Upload :avatar="newsForm.cover" @changeAvatar="handleChange"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  <script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import Editor from "@/components/editor/Editor.vue";
import Upload from "@/components/upload/upload.vue";
import upload from "@/utils/upload.js";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { compose } from "element-plus/es/components/table/src/util";

const router = useRouter();
const route = useRoute();
const newsFormRef = ref();

const newsForm = reactive({
  title: "",
  content: "",
  category: 1, //1 最新动态 2 典型案例 3 通知公告
  cover: "",
  file: null,
  isPublish: 0, //0 未发布 1 发布
});

const newsRules = reactive({
  title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
  content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
  category: [{ required: true, message: "请选择类型", trigger: "blur" }],
  cover: [{ required: true, message: "请上传封面", trigger: "blur" }],
});

const categorys = [
  { label: "最新动态", value: 1 },
  { label: "典型案例", value: 2 },
  { label: "通知公告", value: 3 },
];
//跳转编辑页面，自动回显该条数据到对应的输入框中
onMounted(async () => {
  let { data } = await axios.get(`/adminapi/news/news/${route.params._id}`);
  if (data.code === 0) {
    console.log(data.data);
    Object.assign(newsForm, data.data);
  }
});
//每次editor内容改变的回调
const getNewsContent = (val) => {
  newsForm.content = val;
};

//上传封面图片的本地回调 ，将file
const handleChange = (file) => {
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file;
};

//返回按钮
const handleBack = () => {
  router.back();
};
const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(newsForm);
      //后台通信
      let data = await upload(`/adminapi/news/oneNews`, newsForm);
      console.log(data);
      //提示 路由跳转
      if (data.code === 0) {
        ElMessage.success(data.msg);
        router.back();
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