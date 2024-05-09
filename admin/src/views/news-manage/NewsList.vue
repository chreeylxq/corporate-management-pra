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
            <div v-if="item.name === 'isPublish'">
              <el-switch
                v-model="scope.row.isPublish"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="handleSwitchStatus(scope.row)"
              >
              </el-switch>
            </div>
            <div v-if="item.name === 'category'">
              {{ categoryformat(scope.row.category) }}
            </div>
            <div v-if="item.name === 'editTime'">
              {{ formatTime.getTime(scope.row.editTime) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="success"
              circle
              :icon="Star"
              @click="preview(scope.row)"
            >
            </el-button>
            <el-button
              type="message"
              circle
              :icon="Edit"
              @click="handleEdit(scope.row)"
            >
            </el-button>
            <el-button
              type="danger"
              circle
              :icon="Delete"
              @click="delVisible(scope.row)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="预览新闻"
      v-model="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <h2>{{ previewData.title }}</h2>
        <span>{{ formatTime.getTime(previewData.editTime) }}</span>
        <el-divider></el-divider>
        <div v-html="previewData.content" class="htmlContent"></div>
      </div>
    </el-dialog>
    <DeleteComponent
      v-model:delDialogVisible="delDialogVisible"
      @delUser="handleDel"
      :itemId="itemId"
    ></DeleteComponent>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Star, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import DeleteComponent from "@/components/button/Delete.vue";
import formatTime from "@/utils/formatTime";
import axios from "axios";

const router = useRouter();
const tableData = ref([]);
const previewData = ref({});
const dialogVisible = ref(false);
const delDialogVisible = ref(false);
const itemId = ref();
const tableNameList = [
  { name: "title", label: "标题" },
  { name: "category", label: "分类" },
  { name: "editTime", label: "更新时间" },
  { name: "isPublish", label: "是否发布" },
];

onMounted(() => {
  getNewsList();
});

const getNewsList = () => {
  axios.get("/adminapi/news/list").then((res) => {
    if (res.data.code === 0) {
      tableData.value = res.data.data;
    }
  });
};

//格式化分类
const categoryformat = (value) => {
  let category = ["最新动态", "典型案例", "通知公告"];
  return category[value - 1];
};

//切换状态的回调
const handleSwitchStatus = async (value) => {
  console.log(value);
  let { data } = await axios.put("/adminapi/news/list", {
    _id: value._id,
    isPublish: value.isPublish,
  });
  if (data.code === 0) {
    getNewsList();
    ElMessage.success(data.msg);
  }
};

//预览按钮点击事件
const preview = (item) => {
  previewData.value = item;
  dialogVisible.value = true;
};
//点击删除按钮事件
const delVisible = ({ _id }) => {
  delDialogVisible.value = true;
  console.log(_id);

  itemId.value = _id;
};

//确认删除回调
const handleDel = async (delId) => {
  console.log("delId:" + delId);
  let { data } = await axios.delete(`/adminapi/news/list/${delId}`);

  if (data.code === 0) {
    ElMessage.success(data.msg);
    getNewsList();
  }
};

//点击编辑按钮回调
const handleEdit = (item) => {
  router.push(`/news-manage/editNews/${item._id}`);
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
.el-dialog {
  div {
    span {
      font-size: 12px;
    }
  }
}
::v-deep .htmlContent {
  img {
    width: 100%;
  }
}
</style>