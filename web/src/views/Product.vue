<template>
  <div>
    <el-carousel
      v-if="loopList.length"
      height="calc(100vh - 59px)"
      direction="vertical"
      :autoplay="false"
    >
      <el-carousel-item v-for="item in loopList" :key="item._id">
        <div
          class="item"
          :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
        >
          <el-card>
            <template #header>
              <div class="card-header">
                <h2>{{ item.title }}</h2>
              </div>
            </template>
            <div>{{ item.introduction }}</div>
            <div class="detail">{{ item.detail }}</div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-empty v-else description="暂无产品" />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const loopList = ref([]);

onMounted(() => {
  getProductList();
});
const getProductList = async () => {
  const { data } = await axios.get("/webapi/product/list");

  loopList.value = data.data;
};
</script>
<style scoped>
.item {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.el-card {
  width: 50%;
  height: 100%;
  float: left;
  background: rgba(255, 255, 255, 0.3);
}
.detail {
  margin-top: 20px;
}
</style>