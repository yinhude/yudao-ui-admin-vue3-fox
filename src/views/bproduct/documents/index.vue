<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="产品id" prop="productId">
        <el-input
          v-model="queryParams.productId"
          placeholder="请输入产品id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="请选择类型"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="产品id" prop="revision">
        <el-input
          v-model="queryParams.revision"
          placeholder="请输入产品id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="格式" prop="format">
        <el-input
          v-model="queryParams.format"
          placeholder="请输入格式"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="语言" prop="language">
        <el-input
          v-model="queryParams.language"
          placeholder="请输入语言"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="本地类型" prop="localType">
        <el-select
          v-model="queryParams.localType"
          placeholder="请选择本地类型"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="文件大小" prop="rawFileSize">
        <el-input
          v-model="queryParams.rawFileSize"
          placeholder="请输入文件大小"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="文件编号" prop="docNumber">
        <el-input
          v-model="queryParams.docNumber"
          placeholder="请输入文件编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="lang code" prop="langCode">
        <el-input
          v-model="queryParams.langCode"
          placeholder="请输入lang code"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="页面显示大小" prop="viewableSize">
        <el-input
          v-model="queryParams.viewableSize"
          placeholder="请输入页面显示大小"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="文件名称" prop="filename">
        <el-input
          v-model="queryParams.filename"
          placeholder="请输入文件名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="路径" prop="url">
        <el-input
          v-model="queryParams.url"
          placeholder="请输入路径"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="本地存储路径" prop="minioUrl">
        <el-input
          v-model="queryParams.minioUrl"
          placeholder="请输入本地存储路径"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-220px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['bproduct:documents:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['bproduct:documents:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="产品id" align="center" prop="productId" />
      <el-table-column label="类型" align="center" prop="type" />
      <el-table-column label="产品id" align="center" prop="revision" />
      <el-table-column label="格式" align="center" prop="format" />
      <el-table-column label="语言" align="center" prop="language" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="本地类型" align="center" prop="localType" />
      <el-table-column label="文件大小" align="center" prop="rawFileSize" />
      <el-table-column label="文件编号" align="center" prop="docNumber" />
      <el-table-column label="lang code" align="center" prop="langCode" />
      <el-table-column label="页面显示大小" align="center" prop="viewableSize" />
      <el-table-column label="文件名称" align="center" prop="filename" />
      <el-table-column label="路径" align="center" prop="url" />
      <el-table-column label="本地存储路径" align="center" prop="minioUrl" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center" min-width="120px">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['bproduct:documents:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['bproduct:documents:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <DocumentsForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { DocumentsApi, DocumentsVO } from '@/api/bproduct/documents'
import DocumentsForm from './DocumentsForm.vue'

/** 文档 列表 */
defineOptions({ name: 'Documents' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<DocumentsVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
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
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await DocumentsApi.getDocumentsPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await DocumentsApi.deleteDocuments(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await DocumentsApi.exportDocuments(queryParams)
    download.excel(data, '文档.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>