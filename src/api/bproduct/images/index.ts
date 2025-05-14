import request from '@/config/axios'

// 图片 VO
export interface ImagesVO {
  id: number // 主键id
  productId: number // 产品id
  imageName: string // 文件名称
  imageUrl: string // 文件路径
  imageThumbnailUrl: string // 缩略图路径
  minioUrl: string // minio路径
  minioThumbnailUrl: string // minio缩略图路径
}

// 图片 API
export const ImagesApi = {
  // 查询图片分页
  getImagesPage: async (params: any) => {
    return await request.get({ url: `/bproduct/images/page`, params })
  },

  // 查询图片详情
  getImages: async (id: number) => {
    return await request.get({ url: `/bproduct/images/get?id=` + id })
  },

  // 新增图片
  createImages: async (data: ImagesVO) => {
    return await request.post({ url: `/bproduct/images/create`, data })
  },

  // 修改图片
  updateImages: async (data: ImagesVO) => {
    return await request.put({ url: `/bproduct/images/update`, data })
  },

  // 删除图片
  deleteImages: async (id: number) => {
    return await request.delete({ url: `/bproduct/images/delete?id=` + id })
  },

  // 导出图片 Excel
  exportImages: async (params) => {
    return await request.download({ url: `/bproduct/images/export-excel`, params })
  },
}
