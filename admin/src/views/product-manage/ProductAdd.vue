<template>
  <div>
    <el-page-header
      :icon="null"
      title="产品管理"
      content="添加产品"
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
        <el-button type="primary" @click="submitForm()">添加产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  <script setup>
import { ref, reactive } from "vue";

import Upload from "@/components/upload/upload.vue";
import upload from "@/utils/upload.js";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

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

//每次editor内容改变的回调
// const getproductContent = (val) => {
//   productForm.content = val;
// };

//上传封面图片的本地回调 ，将file
const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};

const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(productForm);
      //后台通信
      let res = await upload("/adminapi/product/addproduct", productForm);
      //提示 路由跳转
      if (res.code === 0) {
        ElMessage.success(res.msg);
        router.push("/product-manage/productList");
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