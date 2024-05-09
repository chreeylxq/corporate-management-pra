<template>
  <div id="myeditor"></div>
</template>
<script setup>
import { onMounted, defineEmits, defineProps } from "vue";
import E from "wangeditor";

const emit = defineEmits(["event"]);
const props = defineProps({
  content: String,
});
onMounted(() => {
  createEditor();
});
const createEditor = () => {
  const editor = new E("#myeditor");
  editor.create();

  //若有初始值，设置初始值
  props.content && editor.txt.html(props.content);
  editor.config.onchange = (newHtml) => {
    //子传父
    emit("event", newHtml);
  };
};
</script>
<style lang="scss" scoped>
#editor—wrapper {
  border: 1px solid #ccc;
  z-index: 100; /* 按需定义 */
}
#toolbar-container {
  border-bottom: 1px solid #ccc;
}
#editor-container {
  height: 500px;
}
</style>