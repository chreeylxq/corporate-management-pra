<template>
  <el-dialog
    v-model="delDialogVisible"
    title="提示"
    width="500"
    :before-close="handleClose"
  >
    <span>是否确认删除？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleComfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from "vue";

const delDialogVisible = ref(false);
//接受父组件传过来的值
const props = defineProps({
  delDialogVisible: Boolean,
  itemId: String,
});

//监听值变化
watch(
  () => props.delDialogVisible,
  (newValue) => {
    delDialogVisible.value = newValue;
  }
);
//父组件监听事件
const emit = defineEmits(["comfirmDelete"]);

const handleClose = () => {
  delDialogVisible.value = false;
  emit("update:delDialogVisible", false);
};

const handleComfirm = () => {
  delDialogVisible.value = false;
  emit("update:delDialogVisible", false);

  emit("delUser", props.itemId);
};
</script>
<style lang="scss" scoped>
</style>