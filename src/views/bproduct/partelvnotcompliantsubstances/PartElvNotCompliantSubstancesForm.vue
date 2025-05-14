<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="elvID" prop="elvComplianceId">
        <el-input v-model="formData.elvComplianceId" placeholder="请输入elvID" />
      </el-form-item>
      <el-form-item label="子名称" prop="substanceName">
        <el-input v-model="formData.substanceName" placeholder="请输入子名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { PartElvNotCompliantSubstancesApi, PartElvNotCompliantSubstancesVO } from '@/api/bproduct/partelvnotcompliantsubstances'

/** elv不合规含量子 表单 */
defineOptions({ name: 'PartElvNotCompliantSubstancesForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  elvComplianceId: undefined,
  substanceName: undefined,
})
const formRules = reactive({
  elvComplianceId: [{ required: true, message: 'elvID不能为空', trigger: 'blur' }],
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
      formData.value = await PartElvNotCompliantSubstancesApi.getPartElvNotCompliantSubstances(id)
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
    const data = formData.value as unknown as PartElvNotCompliantSubstancesVO
    if (formType.value === 'create') {
      await PartElvNotCompliantSubstancesApi.createPartElvNotCompliantSubstances(data)
      message.success(t('common.createSuccess'))
    } else {
      await PartElvNotCompliantSubstancesApi.updatePartElvNotCompliantSubstances(data)
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
    elvComplianceId: undefined,
    substanceName: undefined,
  }
  formRef.value?.resetFields()
}
</script>