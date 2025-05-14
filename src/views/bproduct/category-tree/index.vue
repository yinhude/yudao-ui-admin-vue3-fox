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
      <el-form-item label="品牌id(如果没有就是合适自己的分类数据)" prop="brandId">
        <el-input
          v-model="queryParams.brandId"
          placeholder="请输入品牌id(如果没有就是合适自己的分类数据)"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="父级id" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入父级id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="元数据id" prop="originId">
        <el-input
          v-model="queryParams.originId"
          placeholder="请输入元数据id"
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
      <el-form-item label="简称" prop="shortName">
        <el-input
          v-model="queryParams.shortName"
          placeholder="请输入简称"
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
      <el-form-item label="元数据字段" prop="facet">
        <el-input
          v-model="queryParams.facet"
          placeholder="请输入元数据字段"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="层级" prop="level">
        <el-input
          v-model="queryParams.level"
          placeholder="请输入层级"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="系列图片url" prop="categoryPicUrl">
        <el-input
          v-model="queryParams.categoryPicUrl"
          placeholder="请输入系列图片url"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="0:初始化 	1:applications:标识应用场景	2:series:系列	3:standards：标准	4:industries：行业	5:category：分类	6:productfamilary	7:合适种类信息（level0->根路径 level1->元器件种类 level->2种类下的小种类 level->3系列）" prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="请选择0:初始化 	1:applications:标识应用场景	2:series:系列	3:standards：标准	4:industries：行业	5:category：分类	6:productfamilary	7:合适种类信息（level0->根路径 level1->元器件种类 level->2种类下的小种类 level->3系列）"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input
          v-model="queryParams.sort"
          placeholder="请输入排序"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="状态 1 正常  0 停用" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择状态 1 正常  0 停用"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
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
          v-hasPermi="['bproduct:category:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['bproduct:category:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
        <el-button type="danger" plain @click="toggleExpandAll">
          <Icon icon="ep:sort" class="mr-5px" /> 展开/折叠
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>


  <!-- 列表 -->
  <ContentWrap>
    <el-table
      v-loading="loading"
      :data="list"
      :stripe="true"
      :show-overflow-tooltip="true"
      row-key="id"
      :default-expand-all="isExpandAll"
      v-if="refreshTable"
    >
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="品牌id(如果没有就是合适自己的分类数据)" align="center" prop="brandId" />
      <el-table-column label="父级id" align="center" prop="parentId" />
      <el-table-column label="元数据id" align="center" prop="originId" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="简称" align="center" prop="shortName" />
      <el-table-column label="关键字" align="center" prop="keywords" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="元数据字段" align="center" prop="facet" />
      <el-table-column label="层级" align="center" prop="level" />
      <el-table-column label="系列图片url" align="center" prop="categoryPicUrl" >
        <template   #default="scope">
        <img v-if="scope.row.categoryPicUrl" :src="'http://192.168.0.41:9000' +scope.row.categoryPicUrl" style="width: 40px"   @click="imagePreview('http://192.168.0.41:9000' +scope.row.categoryPicUrl)"/>
        <span v-else>-</span>
      </template>
      </el-table-column>
      <el-table-column label="0:初始化 	1:applications:标识应用场景	2:series:系列	3:standards：标准	4:industries：行业	5:category：分类	6:productfamilary	7:合适种类信息（level0->根路径 level1->元器件种类 level->2种类下的小种类 level->3系列）" align="center" prop="type" />
      <el-table-column label="排序" align="center" prop="sort" />
      <el-table-column label="描述" align="center" prop="description" />
      <el-table-column label="状态 1 正常  0 停用" align="center" prop="status" />
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
            v-hasPermi="['bproduct:category:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['bproduct:category:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
   
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <CategoryForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { createImageViewer } from '@/components/ImageViewer'
import { dateFormatter } from '@/utils/formatTime'
import { handleTreeOriginId as handleTree } from '@/utils/tree'
import download from '@/utils/download'
import { CategoryApi, CategoryVO } from '@/api/bproduct/category'
import CategoryForm from './CategoryForm.vue'

/** 商品系列 列表 */
defineOptions({ name: 'Category' })
/** 商品图预览 */
const imagePreview = (imgUrl: string) => {
  createImageViewer({
    urlList: [imgUrl]
  })
}

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<CategoryVO[]>([]) // 列表的数据
const queryParams = reactive({
  brandId: undefined,
  parentId: undefined,
  originId: undefined,
  name: undefined,
  shortName: undefined,
  title: undefined,
  facet: undefined,
  level: undefined,
  categoryPicUrl: undefined,
  type: undefined,
  sort: undefined,
  description: undefined,
  status: undefined,
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await CategoryApi.getCategoryList(queryParams)

    list.value = handleTree(data, 'id', 'parentId')
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  
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
    await CategoryApi.deleteCategory(id)
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
    const data = await CategoryApi.exportCategory(queryParams)
    download.excel(data, '商品系列.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 展开/折叠操作 */
const isExpandAll = ref(false) // 是否展开，默认全部展开
const refreshTable = ref(true) // 重新渲染表格状态
const toggleExpandAll = async () => {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  await nextTick()
  refreshTable.value = true
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>