<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="品牌id(如果没有就是合适自己的分类数据)" prop="brandId">
        <el-input v-model="formData.brandId" placeholder="请输入品牌id(如果没有就是合适自己的分类数据)" />
      </el-form-item>
      <el-form-item label="父级id" prop="parentId">
        <el-input v-model="formData.parentId" placeholder="请输入父级id" />
      </el-form-item>
      <el-form-item label="元数据id" prop="originId">
        <el-input v-model="formData.originId" placeholder="请输入元数据id" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="关键字" prop="keywords">
        <el-input v-model="formData.keywords" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="简称" prop="shortName">
        <el-input v-model="formData.shortName" placeholder="请输入简称" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="元数据字段" prop="facet">
        <el-input v-model="formData.facet" placeholder="请输入元数据字段" />
      </el-form-item>
      <el-form-item label="层级" prop="level">
        <el-input v-model="formData.level" placeholder="请输入层级" />
      </el-form-item>
      <el-form-item label="系列图片url" prop="categoryPicUrl">
        <el-input v-model="formData.categoryPicUrl" placeholder="请输入系列图片url" />
      </el-form-item>
      <el-form-item label="0:初始化 	1:applications:标识应用场景	2:series:系列	3:standards：标准	4:industries：行业	5:category：分类	6:productfamilary	7:合适种类信息（level0->根路径 level1->元器件种类 level->2种类下的小种类 level->3系列）" prop="type">
        <el-select v-model="formData.type" placeholder="请选择0:初始化 	1:applications:标识应用场景	2:series:系列	3:standards：标准	4:industries：行业	5:category：分类	6:productfamilary	7:合适种类信息（level0->根路径 level1->元器件种类 level->2种类下的小种类 level->3系列）">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort" placeholder="请输入排序" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <Editor v-model="formData.description" height="150px" />
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
import { CategoryApi, CategoryVO } from '@/api/bproduct/category'

/** 商品系列 表单 */
defineOptions({ name: 'CategoryForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  brandId: undefined,
  parentId: undefined,
  originId: undefined,
  name: undefined,
  keywords: undefined,
  shortName: undefined,
  title: undefined,
  facet: undefined,
  level: undefined,
  categoryPicUrl: undefined,
  type: undefined,
  sort: undefined,
  description: undefined,
  status: undefined,
})
const formRules = reactive({
  name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
  type: [{ required: true, message: '0:初始化 	1:applications:标识应用场景	2:series:系列	3:standards：标准	4:industries：行业	5:category：分类	6:productfamilary	7:合适种类信息（level0->根路径 level1->元器件种类 level->2种类下的小种类 level->3系列）不能为空', trigger: 'change' }],
  status: [{ required: true, message: '状态 1 正常  0 停用不能为空', trigger: 'blur' }],
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
      formData.value = await CategoryApi.getCategory(id)
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
    const data = formData.value as unknown as CategoryVO
    if (formType.value === 'create') {
      await CategoryApi.createCategory(data)
      message.success(t('common.createSuccess'))
    } else {
      await CategoryApi.updateCategory(data)
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
    brandId: undefined,
    parentId: undefined,
    originId: undefined,
    name: undefined,
    shortName: undefined,
    keywords: undefined,
    title: undefined,
    facet: undefined,
    level: undefined,
    categoryPicUrl: undefined,
    type: undefined,
    sort: undefined,
    description: undefined,
    status: undefined,
  }
  formRef.value?.resetFields()
}
</script>