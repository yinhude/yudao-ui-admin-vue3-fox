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
      <el-form-item label="元数据id" prop="originId">
        <el-input
          v-model="queryParams.originId"
          placeholder="请输入元数据id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="图片地址" prop="img">
        <el-input
          v-model="queryParams.img"
          placeholder="请输入图片地址"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="1:regular:产品  2:model:归类" prop="partType">
        <el-select
          v-model="queryParams.partType"
          placeholder="请选择1:regular:产品  2:model:归类"
          clearable
          class="!w-240px"
        >
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="品牌id" prop="brandId">
        <el-input
          v-model="queryParams.brandId"
          placeholder="请输入品牌id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="平台自身分类、系列id" prop="selfCategoryId">
        <el-input
          v-model="queryParams.selfCategoryId"
          placeholder="请输入平台自身分类、系列id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="父级分类id" prop="parentCategoryId">
        <el-input
          v-model="queryParams.parentCategoryId"
          placeholder="请输入父级分类id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="产品型号" prop="tcpn">
        <el-input
          v-model="queryParams.tcpn"
          placeholder="请输入产品型号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="elv描述" prop="elvCompliance">
        <el-input
          v-model="queryParams.elvCompliance"
          placeholder="请输入elv描述"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="elv描述" prop="productOwningProfitCenter">
        <el-input
          v-model="queryParams.productOwningProfitCenter"
          placeholder="请输入elv描述"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="替代品是否存在" prop="replacementProductExists">
        <el-input
          v-model="queryParams.replacementProductExists"
          placeholder="请输入替代品是否存在"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="属性" prop="attributeName">
        <el-input
          v-model="queryParams.attributeName"
          placeholder="请输入属性"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="未知字段" prop="buName">
        <el-input
          v-model="queryParams.buName"
          placeholder="请输入未知字段"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="系列id" prop="seriesId">
        <el-input
          v-model="queryParams.seriesId"
          placeholder="请输入系列id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="家族描述id" prop="familyId">
        <el-input
          v-model="queryParams.familyId"
          placeholder="请输入家族描述id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="合规性" prop="rohsCompliance">
        <el-input
          v-model="queryParams.rohsCompliance"
          placeholder="请输入合规性"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="内部型号" prop="marketingPartNumber">
        <el-input
          v-model="queryParams.marketingPartNumber"
          placeholder="请输入内部型号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="军用型号" prop="milspecNumber">
        <el-input
          v-model="queryParams.milspecNumber"
          placeholder="请输入军用型号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="型号" prop="marketingPartNumNormalized">
        <el-input
          v-model="queryParams.marketingPartNumNormalized"
          placeholder="请输入型号"
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
          v-hasPermi="['bproduct:product:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['bproduct:product:export']"
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
      <el-table-column label="元数据id" align="center" prop="originId" />
      <el-table-column label="图片地址" align="center" prop="img" />
      <el-table-column label="1:regular:产品  2:model:归类" align="center" prop="partType" />
      <el-table-column label="品牌id" align="center" prop="brandId" />
      <el-table-column label="平台自身分类、系列id" align="center" prop="selfCategoryId" />
      <el-table-column label="父级分类id" align="center" prop="parentCategoryId" />
      <el-table-column label="描述" align="center" prop="description" />
      <el-table-column label="友好的描述" align="center" prop="friendlyDescription" />
      <el-table-column label="产品型号" align="center" prop="tcpn" />
      <el-table-column label="elv描述" align="center" prop="elvCompliance" />
      <el-table-column label="elv描述" align="center" prop="productOwningProfitCenter" />
      <el-table-column label="替代品是否存在" align="center" prop="replacementProductExists" />
      <el-table-column label="属性" align="center" prop="attributeName" />
      <el-table-column label="未知字段" align="center" prop="buName" />
      <el-table-column label="系列id" align="center" prop="seriesId" />
      <el-table-column label="家族描述id" align="center" prop="familyId" />
      <el-table-column label="合规性" align="center" prop="rohsCompliance" />
      <el-table-column label="内部型号" align="center" prop="marketingPartNumber" />
      <el-table-column label="军用型号" align="center" prop="milspecNumber" />
      <el-table-column label="型号" align="center" prop="marketingPartNumNormalized" />
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
            v-hasPermi="['bproduct:product:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['bproduct:product:delete']"
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
  <ProductForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { ProductApi, ProductVO } from '@/api/bproduct/product'
import ProductForm from './ProductForm.vue'

/** 商品系列 列表 */
defineOptions({ name: 'Product' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<ProductVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
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
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ProductApi.getProductPage(queryParams)
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
    await ProductApi.deleteProduct(id)
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
    const data = await ProductApi.exportProduct(queryParams)
    download.excel(data, '商品系列.xls')
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