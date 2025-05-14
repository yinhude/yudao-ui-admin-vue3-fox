<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="rohs" prop="rohs10ComplianceId">
        <el-input v-model="formData.rohs10ComplianceId" placeholder="请输入rohs" />
      </el-form-item>
      <el-form-item label="子系列名称" prop="substanceName">
        <el-input v-model="formData.substanceName" placeholder="请输入子系列名称" />
      </el-form-item>
      <el-form-item label="包含的子系列" prop="containsSubstance">
        <el-input v-model="formData.containsSubstance" placeholder="请输入包含的子系列" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { PartRohs10NotCompliantSubstancesApi, PartRohs10NotCompliantSubstancesVO } from '@/api/bproduct/partrohs10notcompliantsubstances'

/** rohs不符合的含量 表单 */
defineOptions({ name: 'PartRohs10NotCompliantSubstancesForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  rohs10ComplianceId: undefined,
  substanceName: undefined,
  containsSubstance: undefined,
})
const formRules = reactive({
  rohs10ComplianceId: [{ required: true, message: 'rohs不能为空', trigger: 'blur' }],
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
      formData.value = await PartRohs10NotCompliantSubstancesApi.getPartRohs10NotCompliantSubstances(id)
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
    const data = formData.value as unknown as PartRohs10NotCompliantSubstancesVO
    if (formType.value === 'create') {
      await PartRohs10NotCompliantSubstancesApi.createPartRohs10NotCompliantSubstances(data)
      message.success(t('common.createSuccess'))
    } else {
      await PartRohs10NotCompliantSubstancesApi.updatePartRohs10NotCompliantSubstances(data)
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
    rohs10ComplianceId: undefined,
    substanceName: undefined,
    containsSubstance: undefined,
  }
  formRef.value?.resetFields()
}
</script>