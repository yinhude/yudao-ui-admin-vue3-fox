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
      <el-form-item label="编码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入编码" />
      </el-form-item>
      <el-form-item label="展示值" prop="displayValue">
        <el-input v-model="formData.displayValue" placeholder="请输入展示值" />
      </el-form-item>
      <el-form-item label="是否是数值" prop="numeric">
        <el-input v-model="formData.numeric" placeholder="请输入是否是数值" />
      </el-form-item>
      <el-form-item label="是否支持筛选" prop="filterOnly">
        <el-input v-model="formData.filterOnly" placeholder="请输入是否支持筛选" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort" placeholder="请输入排序" />
      </el-form-item>
      <el-form-item label="未知参数" prop="attributeType">
        <el-select v-model="formData.attributeType" placeholder="请选择未知参数">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="主要参数" prop="primaryFlag">
        <el-input v-model="formData.primaryFlag" placeholder="请输入主要参数" />
      </el-form-item>
      <el-form-item label="主要字段" prop="primarySourceId">
        <el-input v-model="formData.primarySourceId" placeholder="请输入主要字段" />
      </el-form-item>
      <el-form-item label="未知参数" prop="helpInfoVailable">
        <el-input v-model="formData.helpInfoVailable" placeholder="请输入未知参数" />
      </el-form-item>
      <el-form-item label="未知" prop="uom">
        <el-input v-model="formData.uom" placeholder="请输入未知" />
      </el-form-item>
      <el-form-item label="未知" prop="uiWidget">
        <el-input v-model="formData.uiWidget" placeholder="请输入未知" />
      </el-form-item>
      <el-form-item label="展示" prop="showInCompareView">
        <el-input v-model="formData.showInCompareView" placeholder="请输入展示" />
      </el-form-item>
      <el-form-item label="展示值" prop="label">
        <el-input v-model="formData.label" placeholder="请输入展示值" />
      </el-form-item>
      <el-form-item label="1:primary 2:normal" prop="type">
        <el-select v-model="formData.type" placeholder="请选择1:primary 2:normal">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { FeatureApi, FeatureVO } from '@/api/bproduct/feature'

/** 特征 表单 */
defineOptions({ name: 'FeatureForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  originId: undefined,
  code: undefined,
  displayValue: undefined,
  numeric: undefined,
  filterOnly: undefined,
  sort: undefined,
  attributeType: undefined,
  primaryFlag: undefined,
  primarySourceId: undefined,
  helpInfoVailable: undefined,
  uom: undefined,
  uiWidget: undefined,
  showInCompareView: undefined,
  label: undefined,
  type: undefined,
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
      formData.value = await FeatureApi.getFeature(id)
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
    const data = formData.value as unknown as FeatureVO
    if (formType.value === 'create') {
      await FeatureApi.createFeature(data)
      message.success(t('common.createSuccess'))
    } else {
      await FeatureApi.updateFeature(data)
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
    code: undefined,
    displayValue: undefined,
    numeric: undefined,
    filterOnly: undefined,
    sort: undefined,
    attributeType: undefined,
    primaryFlag: undefined,
    primarySourceId: undefined,
    helpInfoVailable: undefined,
    uom: undefined,
    uiWidget: undefined,
    showInCompareView: undefined,
    label: undefined,
    type: undefined,
  }
  formRef.value?.resetFields()
}
</script>