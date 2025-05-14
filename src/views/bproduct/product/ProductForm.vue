<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="元数据id" prop="originId">
        <el-input v-model="formData.originId" placeholder="请输入元数据id" />
      </el-form-item>
      <el-form-item label="图片地址" prop="img">
        <el-input v-model="formData.img" placeholder="请输入图片地址" />
      </el-form-item>
      <el-form-item label="1:regular:产品  2:model:归类" prop="partType">
        <el-select v-model="formData.partType" placeholder="请选择1:regular:产品  2:model:归类">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="品牌id" prop="brandId">
        <el-input v-model="formData.brandId" placeholder="请输入品牌id" />
      </el-form-item>
      <el-form-item label="平台自身分类、系列id" prop="selfCategoryId">
        <el-input v-model="formData.selfCategoryId" placeholder="请输入平台自身分类、系列id" />
      </el-form-item>
      <el-form-item label="父级分类id" prop="parentCategoryId">
        <el-input v-model="formData.parentCategoryId" placeholder="请输入父级分类id" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <Editor v-model="formData.description" height="150px" />
      </el-form-item>
      <el-form-item label="友好的描述" prop="friendlyDescription">
        <Editor v-model="formData.friendlyDescription" height="150px" />
      </el-form-item>
      <el-form-item label="产品型号" prop="tcpn">
        <el-input v-model="formData.tcpn" placeholder="请输入产品型号" />
      </el-form-item>
      <el-form-item label="elv描述" prop="elvCompliance">
        <el-input v-model="formData.elvCompliance" placeholder="请输入elv描述" />
      </el-form-item>
      <el-form-item label="elv描述" prop="productOwningProfitCenter">
        <el-input v-model="formData.productOwningProfitCenter" placeholder="请输入elv描述" />
      </el-form-item>
      <el-form-item label="替代品是否存在" prop="replacementProductExists">
        <el-input v-model="formData.replacementProductExists" placeholder="请输入替代品是否存在" />
      </el-form-item>
      <el-form-item label="属性" prop="attributeName">
        <el-input v-model="formData.attributeName" placeholder="请输入属性" />
      </el-form-item>
      <el-form-item label="未知字段" prop="buName">
        <el-input v-model="formData.buName" placeholder="请输入未知字段" />
      </el-form-item>
      <el-form-item label="系列id" prop="seriesId">
        <el-input v-model="formData.seriesId" placeholder="请输入系列id" />
      </el-form-item>
      <el-form-item label="家族描述id" prop="familyId">
        <el-input v-model="formData.familyId" placeholder="请输入家族描述id" />
      </el-form-item>
      <el-form-item label="合规性" prop="rohsCompliance">
        <el-input v-model="formData.rohsCompliance" placeholder="请输入合规性" />
      </el-form-item>
      <el-form-item label="内部型号" prop="marketingPartNumber">
        <el-input v-model="formData.marketingPartNumber" placeholder="请输入内部型号" />
      </el-form-item>
      <el-form-item label="军用型号" prop="milspecNumber">
        <el-input v-model="formData.milspecNumber" placeholder="请输入军用型号" />
      </el-form-item>
      <el-form-item label="型号" prop="marketingPartNumNormalized">
        <el-input v-model="formData.marketingPartNumNormalized" placeholder="请输入型号" />
      </el-form-item>
      <el-form-item label="状态 1 正常  0 停用" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { ProductApi, ProductVO } from '@/api/bproduct/product'

/** 商品系列 表单 */
defineOptions({ name: 'ProductForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  originId: undefined,
  img: undefined,
  partType: undefined,
  brandId: undefined,
  selfCategoryId: undefined,
  parentCategoryId: undefined,
  description: undefined,
  friendlyDescription: undefined,
  tcpn: undefined,
  elvCompliance: undefined,
  productOwningProfitCenter: undefined,
  replacementProductExists: undefined,
  attributeName: undefined,
  buName: undefined,
  seriesId: undefined,
  familyId: undefined,
  rohsCompliance: undefined,
  marketingPartNumber: undefined,
  milspecNumber: undefined,
  marketingPartNumNormalized: undefined,
  status: undefined,
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
      formData.value = await ProductApi.getProduct(id)
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
    const data = formData.value as unknown as ProductVO
    if (formType.value === 'create') {
      await ProductApi.createProduct(data)
      message.success(t('common.createSuccess'))
    } else {
      await ProductApi.updateProduct(data)
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
    originId: undefined,
    img: undefined,
    partType: undefined,
    brandId: undefined,
    selfCategoryId: undefined,
    parentCategoryId: undefined,
    description: undefined,
    friendlyDescription: undefined,
    tcpn: undefined,
    elvCompliance: undefined,
    productOwningProfitCenter: undefined,
    replacementProductExists: undefined,
    attributeName: undefined,
    buName: undefined,
    seriesId: undefined,
    familyId: undefined,
    rohsCompliance: undefined,
    marketingPartNumber: undefined,
    milspecNumber: undefined,
    marketingPartNumNormalized: undefined,
    status: undefined,
  }
  formRef.value?.resetFields()
}
</script>