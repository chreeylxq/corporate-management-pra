<template>
  <div>
    <el-card>
      <el-page-header
        :icon="null"
        title="用户管理"
        content="用户列表"
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
            <div v-if="item.name === 'gender'">
              {{
                scope.row.gender === 0
                  ? "保密"
                  : scope.row.gender === 1
                  ? "男"
                  : "女"
              }}
            </div>
            <div v-else-if="item.name === 'role'">
              <el-tag :type="scope.row.role === 1 ? 'success' : 'info'">
                {{ scope.row.role === 1 ? "管理员" : "编辑" }}
              </el-tag>
            </div>
            <div v-else-if="item.name === 'avatar'">
              <el-avatar
                :size="80"
                style="font-size: 50px"
                :src="
                  scope.row.avatar
                    ? `http://localhost:3000/${scope.row.avatar}`
                    : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                "
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button size="small" @click="changeVisibl(scope.row)">
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="delVisible(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Edit
        v-model:editDialogFormVisible="editDialogFormVisible"
        :rowData="rowData"
        @editUser="handleEdit"
      ></Edit>
      <Delete
        v-model:delDialogVisible="delDialogVisible"
        @delUser="handleDel"
        :itemId="itemId"
      >
      </Delete>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Edit from "@/components/button/Edit.vue";
import Delete from "@/components/button/Delete.vue";

const tableData = ref([]);
const delDialogVisible = ref(false);
const editDialogFormVisible = ref(false);
const rowData = ref({});
const itemId = ref();

const tableNameList = [
  { name: "username", label: "用户名" },
  { name: "avatar", label: "头像" },
  { name: "role", label: "角色" },
  { name: "gender", label: "性别" },
  { name: "introduction", label: "简介" },
];

onMounted(() => {
  getUserList();
});

const getUserList = () => {
  axios.get("/adminapi/user/userList").then((res) => {
    if (res.data.code === 0) {
      tableData.value = res.data.data;
    }
  });
};
const changeVisibl = (row) => {
  editDialogFormVisible.value = true;
  rowData.value = row;
};
const delVisible = ({ _id }) => {
  delDialogVisible.value = true;
  console.log(_id);

  userId.value = _id;
};
const handleEdit = (newData) => {
  console.log("afterEditNewData:" + newData);

  axios.post("/adminapi/user/editUser", newData).then((res) => {
    if (res.data.code === 0) {
      getUserList();
    }
  });
};
const handleDel = (delId) => {
  console.log("delId:" + delId);
  axios.delete(`/adminapi/user/list/${delId}`).then((res) => {
    if (res.data.code === 0) {
      getUserList();
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