<template>
  <div>
    <el-row>
      <el-col :span="17" :offset="1">
        <h1 class="title">{{ currentNews.title }}</h1>
        <div class="time">{{ formatTime.getTime(currentNews.editTime) }}</div>
        <el-divider />
        <div class="content" v-html="currentNews.content"></div>
      </el-col>
      <el-col :span="4" :offset="2" :pull="1">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>最近新闻</span>
            </div>
          </template>
          <p
            v-for="(item, index) in topNews"
            :key="item._id"
            @click="changeNewsPage(item._id)"
          >
            {{ index + 1 + `&nbsp;&nbsp;&nbsp;` + item.title }}
          </p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import formatTime from "@/utils/formatTime";
import { compose } from "element-plus/es/components/table/src/util";
import router from "@/router";

const currentNews = ref("");
const topNews = ref("");
const route = useRoute();

watchEffect(async () => {
  const res1 = await axios.get(`/webapi/news/list/${route.params.id}`);
  const res2 = await axios.get(`/webapi/news/toplist?limit=4`);
  if (res1.data.code === 0) {
    currentNews.value = res1.data.data;
  }
  if (res2.data.code === 0) {
    topNews.value = res2.data.data;
  }
});

const changeNewsPage = (id) => {
  router.push(`/newspage/${id}`);
};
</script>
<style lang="scss">
.el-row {
  margin-top: 30px;
}
.el-col {
  .time {
    font-size: 13px;
    color: grey;
  }
  .el-card {
    .card-header span {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    p {
      margin-bottom: 14px;
    }
  }
}
</style>