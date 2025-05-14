<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="产品id" prop="productId">
        <el-input v-model="formData.productId" placeholder="请输入产品id" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="产品id" prop="revision">
        <el-input v-model="formData.revision" placeholder="请输入产品id" />
      </el-form-item>
      <el-form-item label="格式" prop="format">
        <el-input v-model="formData.format" placeholder="请输入格式" />
      </el-form-item>
      <el-form-item label="语言" prop="language">
        <el-input v-model="formData.language" placeholder="请输入语言" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="本地类型" prop="localType">
        <el-select v-model="formData.localType" placeholder="请选择本地类型">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="文件大小" prop="rawFileSize">
        <el-input v-model="formData.rawFileSize" placeholder="请输入文件大小" />
      </el-form-item>
      <el-form-item label="文件编号" prop="docNumber">
        <el-input v-model="formData.docNumber" placeholder="请输入文件编号" />
      </el-form-item>
      <el-form-item label="lang code" prop="langCode">
        <el-input v-model="formData.langCode" placeholder="请输入lang code" />
      </el-form-item>
      <el-form-item label="页面显示大小" prop="viewableSize">
        <el-input v-model="formData.viewableSize" placeholder="请输入页面显示大小" />
      </el-form-item>
      <el-form-item label="文件名称" prop="filename">
        <el-input v-model="formData.filename" placeholder="请输入文件名称" />
      </el-form-item>
      <el-form-item label="路径" prop="url">
        <el-input v-model="formData.url" placeholder="请输入路径" />
      </el-form-item>
      <el-form-item label="本地存储路径" prop="minioUrl">
        <el-input v-model="formData.minioUrl" placeholder="请输入本地存储路径" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { DocumentsApi, DocumentsVO } from '@/api/bproduct/documents'

/** 文档 表单 */
defineOptions({ name: 'DocumentsForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  productId: undefined,
  type: undefined,
  revision: undefined,
  format: undefined,
  language: undefined,
  title: undefined,
  name: undefined,
  localType: undefined,
  rawFileSize: undefined,
  docNumber: undefined,
  langCode: undefined,
  viewableSize: undefined,
  filename: undefined,
  url: undefined,
  minioUrl: undefined,
})
const formRules = reactive({
  productId: [{ required: true, message: '产品id不能为空', trigger: 'blur' }],
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
      formData.value = await DocumentsApi.getDocuments(id)
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
    const data = formData.value as unknown as DocumentsVO
    if (formType.value === 'create') {
      await DocumentsApi.createDocuments(data)
      message.success(t('common.createSuccess'))
    } else {
      await DocumentsApi.updateDocuments(data)
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
    type: undefined,
    revision: undefined,
    format: undefined,
    language: undefined,
    title: undefined,
    name: undefined,
    localType: undefined,
    rawFileSize: undefined,
    docNumber: undefined,
    langCode: undefined,
    viewableSize: undefined,
    filename: undefined,
    url: undefined,
    minioUrl: undefined,
  }
  formRef.value?.resetFields()
}
</script>