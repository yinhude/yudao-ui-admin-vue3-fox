<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="part_id`" prop="partId">
        <el-input v-model="formData.partId" placeholder="请输入part_id`" />
      </el-form-item>
      <el-form-item label="epup_code受限编码" prop="epupComplianceCode">
        <el-input v-model="formData.epupComplianceCode" placeholder="请输入epup_code受限编码" />
      </el-form-item>
      <el-form-item label="描述" prop="epupComplianceDesc">
        <el-input v-model="formData.epupComplianceDesc" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="图片路径" prop="epupImageUrl">
        <el-input v-model="formData.epupImageUrl" placeholder="请输入图片路径" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { PartChinaRohsComplianceApi, PartChinaRohsComplianceVO } from '@/api/bproduct/partchinarohscompliance'

/** rohs 表单 */
defineOptions({ name: 'PartChinaRohsComplianceForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  partId: undefined,
  epupComplianceCode: undefined,
  epupComplianceDesc: undefined,
  epupImageUrl: undefined,
})
const formRules = reactive({
  partId: [{ required: true, message: 'part_id`不能为空', trigger: 'blur' }],
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
      formData.value = await PartChinaRohsComplianceApi.getPartChinaRohsCompliance(id)
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
    const data = formData.value as unknown as PartChinaRohsComplianceVO
    if (formType.value === 'create') {
      await PartChinaRohsComplianceApi.createPartChinaRohsCompliance(data)
      message.success(t('common.createSuccess'))
    } else {
      await PartChinaRohsComplianceApi.updatePartChinaRohsCompliance(data)
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
    epupComplianceCode: undefined,
    epupComplianceDesc: undefined,
    epupImageUrl: undefined,
  }
  formRef.value?.resetFields()
}
</script>