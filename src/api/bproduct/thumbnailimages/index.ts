import request from '@/config/axios'

// 商品缩略图 VO
export interface ThumbnailImagesVO {
  id: number // 主键
  productId: number // 产品id
  path: string // 路径
  imageName: string // 图片名称
  url: string // 路径
  minioUrl: string // minio路径
}

// 商品缩略图 API
export const ThumbnailImagesApi = {
  // 查询商品缩略图分页
  getThumbnailImagesPage: async (params: any) => {
    return await request.get({ url: `/bproduct/thumbnail-images/page`, params })
  },

  // 查询商品缩略图详情
  getThumbnailImages: async (id: number) => {
    return await request.get({ url: `/bproduct/thumbnail-images/get?id=` + id })
  },

  // 新增商品缩略图
  createThumbnailImages: async (data: ThumbnailImagesVO) => {
    return await request.post({ url: `/bproduct/thumbnail-images/create`, data })
  },

  // 修改商品缩略图
  updateThumbnailImages: async (data: ThumbnailImagesVO) => {
    return await request.put({ url: `/bproduct/thumbnail-images/update`, data })
  },

  // 删除商品缩略图
  deleteThumbnailImages: async (id: number) => {
    return await request.delete({ url: `/bproduct/thumbnail-images/delete?id=` + id })
  },

  // 导出商品缩略图 Excel
  exportThumbnailImages: async (params) => {
    return await request.download({ url: `/bproduct/thumbnail-images/export-excel`, params })
  },
}