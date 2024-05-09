<template>
  <el-dialog
    v-model="editDialogFormVisible"
    title="编辑用户"
    width="45%"
    :before-close="handleCancel"
  >
    <el-form ref="formRef" :model="editForm" :rules="userRules">
      <el-form-item
        v-for="(item, index) in formNameList"
        :key="index"
        :label="item.label + ':'"
        :prop="item.name"
      >
        <el-input
          v-if="item.name !== 'role'"
          :type="
            item.name === 'introduction'
              ? 'textarea'
              : item.name === 'password'
              ? 'passsword'
              : 'text'
          "
          :rows="item.name === 'introduction' ? 4 : 1"
          v-model="editForm[item.name]"
        ></el-input>

        <template v-if="item.name === 'role'">
          <el-select v-model="editForm[item.name]" placeholder="请选择角色">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel(formRef)">取消</el-button>
        <el-button type="primary" @click="handleEdit(formRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, defineEmits, defineProps, watch } from "vue";

const props = defineProps({
  editDialogFormVisible: Boolean,
  rowData: Object,
});
const editDialogFormVisible = ref(false);
const formRef = ref({});

watch(
  () => props.editDialogFormVisible,
  (newValue) => {
    editDialogFormVisible.value = newValue;
  }
);

const formNameList = [
  { name: "username", label: "用户名" },
  { name: "password", label: "密码" },
  { name: "role", label: "角色" },
  { name: "introduction", label: "简介" },
];

//选择角色
const roles = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "编辑",
    value: 2,
  },
];
const editForm = reactive({
  username: "",
  password: "",
  role: "",
  introduction: "",
});
const userRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "bulr" }],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
  introduction: [{ required: true, message: "请输入简介", trigger: "blur" }],
});

const emit = defineEmits(["editUser"]);

const handleEdit = (formEl) => {
  editDialogFormVisible.value = false;
  emit("update:editDialogFormVisible", editDialogFormVisible.value);
  emit("editUser", { ...props.rowData, ...editForm });
  formEl.resetFields();
};
const handleCancel = (formEl) => {
  editDialogFormVisible.value = false;
  emit("update:editDialogFormVisible", editDialogFormVisible.value);
  formEl.resetFields();

  // editDialogFormVisible.value = false;
};
</script>
<style lang="scss" scope>
::v-deep .el-dialog__header {
  margin-top: 10px;
}
.el-form-item__label {
  width: 120px;
}
</style>