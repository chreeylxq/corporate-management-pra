<template>
  <div class="container">
    <div
      class="news-header"
      :style="{ backgroundImage: `url(${require('@/assets/newsBg.jpeg')})` }"
    ></div>

    <div class="searchBar">
      <el-popover
        placement="bottom"
        title="搜索结果"
        width="50%"
        :visible="visible"
      >
        <template #reference>
          <el-input
            v-model="searchText"
            placeholder="请输入新闻"
            :prefix-icon="Search"
            type="search"
            size="large"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div
          v-if="searchNewsList.length && searchText"
          class="searchItem"
          v-for="item in searchNewsList"
          :key="item._id"
          @click="clickNewsPage(item._id)"
        >
          {{ item.title }}
        </div>
        <div v-else><el-empty description="暂无新闻" :image-size="50" /></div>
      </el-popover>
    </div>
    <div class="topnews">
      <el-row :gutter="20">
        <el-col v-for="item in topNewsList" :span="6">
          <el-card
            style="max-width: 480px"
            body-style="padding: 0"
            shadow="hover"
            @click="clickNewsPage(item._id)"
          >
            <div
              class="newsImg"
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
              }"
            ></div>
            <template #footer>
              <div class="title">{{ item.title }}</div>
              <div class="time">{{ formatTime(item.editTime) }}</div>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="newTabs">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane
          v-for="item in tabList"
          :label="item.label"
          :name="item.name"
          :key="item.name"
        >
          <el-row :gutter="20">
            <el-col :span="18">
              <div v-for="data in tabNewsList[item.name]" :key="data._id">
                <el-card
                  style="margin-bottom: 10px"
                  @click="clickNewsPage(data._id)"
                >
                  <div
                    class="tabNewsImage"
                    :style="{
                      backgroundImage: `url(http://localhost:3000${data.cover})`,
                    }"
                  ></div>
                  <div class="content">
                    <span>{{ data.title }}</span>
                    <div class="newsTime">{{ formatTime(data.editTime) }}</div>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="6">
              <el-timeline style="max-width: 600px">
                <el-timeline-item
                  v-for="item in tabNewsList[item.name]"
                  :key="item._id"
                  :timestamp="formatTime(item.editTime)"
                >
                  {{ item.title }}
                </el-timeline-item>
              </el-timeline>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-backtop />
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import { useRouter } from "vue-router";

const router = useRouter();
//时间格式化支持中文
moment.locale("zh-cn");
const visible = ref(false);
const searchText = ref("");
const newsList = ref([]);
const activeName = ref(1);

const tabList = [
  { label: "最新动态", name: 1 },
  { label: "典型案例", name: 2 },
  { label: "通知公告", name: 3 },
];

//过滤新闻，搜素含有搜索文本的新闻
const searchNewsList = computed(() => {
  return newsList.value.filter((item) => item.title.includes(searchText.value));
});

onMounted(() => {
  getNewsData();
});
//获取新闻数据
const getNewsData = async () => {
  let { data } = await axios.get("/webapi/news/list");
  newsList.value = data.data;
};
//截取前4个新闻数据
const topNewsList = computed(() => newsList.value.slice(0, 4));
//格式化时间 传入时间戳
const formatTime = (time) => {
  return moment(time).format("lll");
};

//按照分类分new
const tabNewsList = computed(() => {
  return _.groupBy(newsList.value, (item) => item.category);
});

//点击跳转新闻页面
const clickNewsPage = (_id) => {
  router.push(`/newspage/${_id}`);
};
</script>
<style scoped lang="scss">
.news-header {
  height: 400px;
  width: 100%;
  background-size: cover;
}
.searchBar {
  position: absolute;
  top: 365px;
  width: 100%;
  text-align: center;
  .el-input {
    width: 50%;
  }
}
.searchItem {
  height: 50px;
  line-height: 50px;
  &:hover {
    background: whitesmoke;
  }
}
.topnews {
  margin: 20px;
  .newsImg {
    width: 100%;
    height: 150px;
    background-size: cover;
  }
  .el-card__footer {
    .time {
      font-size: 13px;
      color: grey;
    }
  }
}
::v-deep .el-tabs__item {
  font-weight: 400;
}
.newTabs {
  padding: 0 20px;
  .tabNewsImage {
    width: 200px;
    height: 150px;
    background-size: cover;
    float: left;
    margin-right: 20px;
  }
  .content {
    padding-top: 20px;
    span {
      font-size: 20px;
    }
    .newsTime {
      font-size: 13px;
      color: grey;
    }
  }
}
</style>