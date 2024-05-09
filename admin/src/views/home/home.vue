<template>
  <div>
    <el-page-header
      :icon="null"
      title="企业门户网站管理系统"
      content="首页"
    ></el-page-header>
    <el-card shadow="always">
      <el-row>
        <el-col :span="2">
          <el-avatar :src="avatarUrl" :size="80" style="font-size: 50px" />
        </el-col>
        <el-col :span="22">
          <span
            >欢迎 {{ store.state.userInfo.username }} 回来，{{
              welcomText
            }}</span
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel
        v-if="loopRef.length"
        :interval="4000"
        type="card"
        height="300px"
      >
        <el-carousel-item
          v-for="item in loopRef"
          :key="item._id"
          :style="{
            backgroundImage: `url(http://localhost:3000/${item.cover})`,
            backgroundSize: 'cover',
          }"
        >
          <h3>{{ item.title }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>
<script setup>
import { UserFilled } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import axios from "axios";

const loopRef = ref([]);
const store = useStore();
// const { username } = store.state.userInfo.value;

let avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);
let welcomText = computed(() => {
  let h = new Date().getHours();
  if (h < 12) {
    return "新的一天，新的开始";
  } else if (h < 18) {
    return "喝杯咖啡提提神吧，加油⛽️";
  } else {
    return "辛苦一天了，也要好好休息哦～ 😴";
  }
});

//轮播图现实产品图片
onMounted(() => {
  getData();
});
const getData = async () => {
  let { data } = await axios.get("/adminapi/product/list");
  console.log(data.data);
  loopRef.value = data.data;
};
</script>
<style lang="scss" scoped>
.el-page-header__title {
  font-size: 15px;
  font-weight: 400;
}
.el-card {
  margin-top: 50px;
}
.is-always-shadow {
  height: 120px;
}
.el-col-22 {
  display: flex;
  align-items: center;
  span {
    margin-left: 30px;
  }
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>