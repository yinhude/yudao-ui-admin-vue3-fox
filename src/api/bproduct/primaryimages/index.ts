import request from '@/config/axios'

// 商品主图 VO
export interface PrimaryImagesVO {
  id: number // 主键id
  productId: number // 产品id
  path: string // 路径
  imageName: string // 图像路径
  url: string // url
  minioUrl: string // 本地路径
}

// 商品主图 API
export const PrimaryImagesApi = {
  // 查询商品主图分页
  getPrimaryImagesPage: async (params: any) => {
    return await request.get({ url: `/bproduct/primary-images/page`, params })
  },

  // 查询商品主图详情
  getPrimaryImages: async (id: number) => {
    return await request.get({ url: `/bproduct/primary-images/get?id=` + id })
  },

  // 新增商品主图
  createPrimaryImages: async (data: PrimaryImagesVO) => {
    return await request.post({ url: `/bproduct/primary-images/create`, data })
  },

  // 修改商品主图
  updatePrimaryImages: async (data: PrimaryImagesVO) => {
    return await request.put({ url: `/bproduct/primary-images/update`, data })
  },

  // 删除商品主图
  deletePrimaryImages: async (id: number) => {
    return await request.delete({ url: `/bproduct/primary-images/delete?id=` + id })
  },

  // 导出商品主图 Excel
  exportPrimaryImages: async (params) => {
    return await request.download({ url: `/bproduct/primary-images/export-excel`, params })
  },
}