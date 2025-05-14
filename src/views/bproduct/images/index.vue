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
      <el-form-item label="文件名称" prop="imageName">
        <el-input
          v-model="queryParams.imageName"
          placeholder="请输入文件名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="文件路径" prop="imageUrl">
        <el-input
          v-model="queryParams.imageUrl"
          placeholder="请输入文件路径"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="缩略图路径" prop="imageThumbnailUrl">
        <el-input
          v-model="queryParams.imageThumbnailUrl"
          placeholder="请输入缩略图路径"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="minio路径" prop="minioUrl">
        <el-input
          v-model="queryParams.minioUrl"
          placeholder="请输入minio路径"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="minio缩略图路径" prop="minioThumbnailUrl">
        <el-input
          v-model="queryParams.minioThumbnailUrl"
          placeholder="请输入minio缩略图路径"
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
          v-hasPermi="['bproduct:images:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['bproduct:images:export']"
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
      <el-table-column label="文件名称" align="center" prop="imageName" />
      <el-table-column label="文件路径" align="center" prop="imageUrl" />
      <el-table-column label="缩略图路径" align="center" prop="imageThumbnailUrl" />
      <el-table-column label="minio路径" align="center" prop="minioUrl">
      <template   #default="scope">
        
          <img v-if="scope.row.minioUrl" :src="'http://192.168.0.41:9000' +scope.row.minioUrl" style="width: 40px"   @click="imagePreview('http://192.168.0.41:9000' +scope.row.minioUrl)"/>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="minio缩略图路径" align="center" prop="minioThumbnailUrl" >
      <template   #default="scope">
        
        <img v-if="scope.row.minioThumbnailUrl" :src="'http://192.168.0.41:9000' +scope.row.minioThumbnailUrl" style="width: 40px"   @click="imagePreview('http://192.168.0.41:9000' +scope.row.minioThumbnailUrl)"/>
        <span v-else>-</span>
      </template>
      </el-table-column>
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
            v-hasPermi="['bproduct:images:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['bproduct:images:delete']"
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
  <ImagesForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { createImageViewer } from '@/components/ImageViewer'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { ImagesApi, ImagesVO } from '@/api/bproduct/images'
import ImagesForm from './ImagesForm.vue'

/** 图片 列表 */
defineOptions({ name: 'Images' })
/** 商品图预览 */
const imagePreview = (imgUrl: string) => {
  createImageViewer({
    urlList: [imgUrl]
  })
}
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<ImagesVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  productId: undefined,
  imageName: undefined,
  imageUrl: undefined,
  imageThumbnailUrl: undefined,
  minioUrl: undefined,
  minioThumbnailUrl: undefined,
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ImagesApi.getImagesPage(queryParams)
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
    await ImagesApi.deleteImages(id)
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
    const data = await ImagesApi.exportImages(queryParams)
    download.excel(data, '图片.xls')
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