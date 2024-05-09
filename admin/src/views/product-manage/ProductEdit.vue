<template>
  <div>
    <el-page-header
      @back="handleBack"
      title="产品管理"
      content="产品编辑"
    ></el-page-header>
    <el-form
      ref="productFormRef"
      :model="productForm"
      status-icon
      :rules="productRules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item
        v-for="(item, index) in productLabels"
        key="index"
        :label="item.label"
        :prop="item.name"
      >
        <el-input
          v-if="item.name !== 'cover'"
          v-model="productForm[item.name]"
          :type="
            item.name === 'introduction' || item.name === 'detail'
              ? 'textarea'
              : 'text'
          "
          :rows="item.name === 'introduction' || item.name === 'detail' ? 4 : 1"
        />
        <Upload
          v-if="item.name === 'cover'"
          :avatar="productForm.cover"
          @changeAvatar="handleChange"
        ></Upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">添加产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Upload from "@/components/upload/upload.vue";
import axios from "axios";
import upload from "@/utils/upload";
import { ElMessage } from "element-plus";

const route = useRoute();
const router = useRouter();
const productFormRef = ref();
const productLabels = [
  { name: "title", label: "产品名称" },
  { name: "introduction", label: "产品简要描述" },
  { name: "detail", label: "产品详细描述" },
  { name: "cover", label: "产品图片" },
];
const productForm = reactive({
  title: "",
  introduction: "",
  detail: "",
  cover: "",
  file: null,
});
const productRules = reactive({
  title: [{ required: true, message: "产品名不能为空", trigger: "blur" }],
  introduction: [
    { required: true, message: "产品简要描述不能为空", trigger: "blur" },
  ],
  detail: [
    { required: true, message: "产品详细描述不能为空", trigger: "blur" },
  ],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }],
});

//跳转编辑页面，自动回显该条数据到对应的输入框中
onMounted(async () => {
  let { data } = await axios.get(`/adminapi/product/list/${route.params.id}`);
  if (data.code === 0) {
    console.log(data.data[0]);
    Object.assign(productForm, data.data[0]);
  }
});
//上传封面图片的本地回显
const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};
const handleBack = () => {
  router.back();
};
//提交表单
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(productForm);
      //后台通信
      let data = await upload(`/adminapi/product/updateProduct`, productForm);
      console.log(data);

      if (data.code === 0) {
        ElMessage({
          message: data.msg,
          type: "success",
        });
        router.back();
      } else {
        ElMessage({
          message: data.msg,
          type: "error",
        });
      }
    }
  });
};
</script>
<style lang="scss">
.el-page-header {
  margin-bottom: 50px;
}
.el-page-header__title {
  font-size: 15px;
  font-weight: 400;
}
</style>