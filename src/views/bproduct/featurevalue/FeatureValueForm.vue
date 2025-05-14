<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="特性值id" prop="dimValId">
        <el-input v-model="formData.dimValId" placeholder="请输入特性值id" />
      </el-form-item>
      <el-form-item label="展示值" prop="displayValue">
        <el-input v-model="formData.displayValue" placeholder="请输入展示值" />
      </el-form-item>
      <el-form-item label="主键id" prop="primarySourceId">
        <el-input v-model="formData.primarySourceId" placeholder="请输入主键id" />
      </el-form-item>
      <el-form-item label="关键字" prop="keywords">
        <el-input v-model="formData.keywords" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="值" prop="value">
        <el-input v-model="formData.value" placeholder="请输入值" />
      </el-form-item>
      <el-form-item label="系统值" prop="system">
        <el-input v-model="formData.system" placeholder="请输入系统值" />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input v-model="formData.unit" placeholder="请输入单位" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort" placeholder="请输入排序" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { FeatureValueApi, FeatureValueVO } from '@/api/bproduct/featurevalue'

/** 特征值 表单 */
defineOptions({ name: 'FeatureValueForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  name: undefined,
  dimValId: undefined,
  displayValue: undefined,
  primarySourceId: undefined,
  keywords: undefined,
  value: undefined,
  system: undefined,
  unit: undefined,
  sort: undefined,
})
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await FeatureValueApi.getFeatureValue(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as FeatureValueVO
    if (formType.value === 'create') {
      await FeatureValueApi.createFeatureValue(data)
      message.success(t('common.createSuccess'))
    } else {
      await FeatureValueApi.updateFeatureValue(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    name: undefined,
    dimValId: undefined,
    displayValue: undefined,
    primarySourceId: undefined,
    keywords: undefined,
    value: undefined,
    system: undefined,
    unit: undefined,
    sort: undefined,
  }
  formRef.value?.resetFields()
}
</script>