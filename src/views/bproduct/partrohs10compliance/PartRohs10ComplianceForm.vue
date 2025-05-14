<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="part_id" prop="partId">
        <el-input v-model="formData.partId" placeholder="请输入part_id" />
      </el-form-item>
      <el-form-item label="code" prop="complianceCode">
        <el-input v-model="formData.complianceCode" placeholder="请输入code" />
      </el-form-item>
      <el-form-item label="描述" prop="complianceDescription">
        <Editor v-model="formData.complianceDescription" height="150px" />
      </el-form-item>
      <el-form-item label="描述" prop="selfDescribingDesc">
        <el-input v-model="formData.selfDescribingDesc" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="分组信息" prop="productCategoryEn">
        <el-input v-model="formData.productCategoryEn" placeholder="请输入分组信息" />
      </el-form-item>
      <el-form-item label="分组信息" prop="productCategoryZh">
        <el-input v-model="formData.productCategoryZh" placeholder="请输入分组信息" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { PartRohs10ComplianceApi, PartRohs10ComplianceVO } from '@/api/bproduct/partrohs10compliance'

/** rohs合规性 表单 */
defineOptions({ name: 'PartRohs10ComplianceForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  partId: undefined,
  complianceCode: undefined,
  complianceDescription: undefined,
  selfDescribingDesc: undefined,
  productCategoryEn: undefined,
  productCategoryZh: undefined,
})
const formRules = reactive({
  partId: [{ required: true, message: 'part_id不能为空', trigger: 'blur' }],
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
      formData.value = await PartRohs10ComplianceApi.getPartRohs10Compliance(id)
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
    const data = formData.value as unknown as PartRohs10ComplianceVO
    if (formType.value === 'create') {
      await PartRohs10ComplianceApi.createPartRohs10Compliance(data)
      message.success(t('common.createSuccess'))
    } else {
      await PartRohs10ComplianceApi.updatePartRohs10Compliance(data)
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
    partId: undefined,
    complianceCode: undefined,
    complianceDescription: undefined,
    selfDescribingDesc: undefined,
    productCategoryEn: undefined,
    productCategoryZh: undefined,
  }
  formRef.value?.resetFields()
}
</script>