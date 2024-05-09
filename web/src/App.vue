<template>
  <Navbar></Navbar>
  <router-view />
</template>

<script setup>
import Navbar from "@/components/Navbar";
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  position: absolute;
}
::-webkit-scrollbar-thumb {
  background: #1890ff;
}
::-webkit-scrollbar-track {
  background: #ddd;
}
</style>
