<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="partid" prop="partId">
        <el-input v-model="formData.partId" placeholder="请输入partid" />
      </el-form-item>
      <el-form-item label="法规信息" prop="reachCmpl">
        <el-input v-model="formData.reachCmpl" placeholder="请输入法规信息" />
      </el-form-item>
      <el-form-item label="发布日期" prop="candidateDate">
        <el-date-picker
          v-model="formData.candidateDate"
          type="date"
          value-format="x"
          placeholder="选择发布日期"
        />
      </el-form-item>
      <el-form-item label="更新日期" prop="declarationDate">
        <el-date-picker
          v-model="formData.declarationDate"
          type="date"
          value-format="x"
          placeholder="选择更新日期"
        />
      </el-form-item>
      <el-form-item label="code" prop="declarationCode">
        <el-input v-model="formData.declarationCode" placeholder="请输入code" />
      </el-form-item>
      <el-form-item label="超出限值" prop="containsReach">
        <el-input v-model="formData.containsReach" placeholder="请输入超出限值" />
      </el-form-item>
      <el-form-item label="decl_date_flag" prop="declDateFlag">
        <el-radio-group v-model="formData.declDateFlag">
          <el-radio value="1">请选择字典生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="cand_date_flag" prop="candDateFlag">
        <el-radio-group v-model="formData.candDateFlag">
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
import { PartReachCompliancesApi, PartReachCompliancesVO } from '@/api/bproduct/partreachcompliances'

/** reach合规性 表单 */
defineOptions({ name: 'PartReachCompliancesForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  partId: undefined,
  reachCmpl: undefined,
  candidateDate: undefined,
  declarationDate: undefined,
  declarationCode: undefined,
  containsReach: undefined,
  declDateFlag: undefined,
  candDateFlag: undefined,
})
const formRules = reactive({
  partId: [{ required: true, message: 'partid不能为空', trigger: 'blur' }],
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
      formData.value = await PartReachCompliancesApi.getPartReachCompliances(id)
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
    const data = formData.value as unknown as PartReachCompliancesVO
    if (formType.value === 'create') {
      await PartReachCompliancesApi.createPartReachCompliances(data)
      message.success(t('common.createSuccess'))
    } else {
      await PartReachCompliancesApi.updatePartReachCompliances(data)
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
    reachCmpl: undefined,
    candidateDate: undefined,
    declarationDate: undefined,
    declarationCode: undefined,
    containsReach: undefined,
    declDateFlag: undefined,
    candDateFlag: undefined,
  }
  formRef.value?.resetFields()
}
</script>