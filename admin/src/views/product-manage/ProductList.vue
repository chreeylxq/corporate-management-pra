<template>
  <div>
    <el-card>
      <el-page-header
        :icon="null"
        title="产品管理"
        content="产品列表"
      ></el-page-header>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          align="center"
          v-for="item in tableNameList"
          :key="item.index"
          :prop="item.name"
          :label="item.label"
        >
          <template #default="scope">
            <span v-if="item.name === 'editTime'">
              {{ formatTime.getTime(Number(scope.row.editTime)) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button :icon="Edit" circle @click="handleEdit(scope.row)" />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="delVisible(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <DeleteComponent
      v-model:delDialogVisible="delDialogVisible"
      @delUser="handleDel"
      :itemId="itemId"
    ></DeleteComponent>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import formatTime from "@/utils/formatTime";
import { Delete, Edit } from "@element-plus/icons-vue";
import DeleteComponent from "@/components/button/Delete.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const tableData = ref([]);
const delDialogVisible = ref(false);
const itemId = ref();
const tableNameList = [
  { name: "title", label: "产品名称" },
  { name: "introduction", label: "简要概述" },
  { name: "editTime", label: "更新时间" },
];

onMounted(() => {
  getProdunctList();
});
const getProdunctList = async () => {
  let { data } = await axios.get("/adminapi/product/list");
  tableData.value = data.data;
};
//点击编辑事件
const handleEdit = (item) => {
  router.push(`/product-manage/editProduct/${item._id}`);
};
//点击删除按钮事件
const delVisible = ({ _id }) => {
  delDialogVisible.value = true;
  console.log(_id);

  itemId.value = _id;
};

//确认删除回调
const handleDel = async (delId) => {
  let { data } = await axios.delete(`/adminapi/product/list/${delId}`);
  if (data.code === 0) {
    ElMessage.success(data.msg);
    getProdunctList();
  }
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