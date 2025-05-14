<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="产品ID" prop="productId">
        <el-input v-model="formData.productId" placeholder="请输入产品ID" />
      </el-form-item>
      <el-form-item label="part_num" prop="partNum">
        <el-input v-model="formData.partNum" placeholder="请输入part_num" />
      </el-form-item>
      <el-form-item label="leaf code" prop="leadFreeProcessCode">
        <el-input v-model="formData.leadFreeProcessCode" placeholder="请输入leaf code" />
      </el-form-item>
      <el-form-item label="描述" prop="leadFreeProcessDesc">
        <el-input v-model="formData.leadFreeProcessDesc" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="material_declaration_indicator" prop="materialDeclarationIndicator">
        <el-input v-model="formData.materialDeclarationIndicator" placeholder="请输入material_declaration_indicator" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { PartPartsApi, PartPartsVO } from '@/api/bproduct/partparts'

/** part合规性 表单 */
defineOptions({ name: 'PartPartsForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  productId: undefined,
  partNum: undefined,
  leadFreeProcessCode: undefined,
  leadFreeProcessDesc: undefined,
  materialDeclarationIndicator: undefined,
})
const formRules = reactive({
  productId: [{ required: true, message: '产品ID不能为空', trigger: 'blur' }],
  partNum: [{ required: true, message: 'part_num不能为空', trigger: 'blur' }],
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
      formData.value = await PartPartsApi.getPartParts(id)
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
    const data = formData.value as unknown as PartPartsVO
    if (formType.value === 'create') {
      await PartPartsApi.createPartParts(data)
      message.success(t('common.createSuccess'))
    } else {
      await PartPartsApi.updatePartParts(data)
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
    productId: undefined,
    partNum: undefined,
    leadFreeProcessCode: undefined,
    leadFreeProcessDesc: undefined,
    materialDeclarationIndicator: undefined,
  }
  formRef.value?.resetFields()
}
</script>