import request from '@/config/axios'

// 品牌 VO
export interface BrandVO {
  id: number // 主键id
  name: string // 品牌名称
  firstChar: string // 首字母
  originName: string // 区域名称
  originCode: string // 区域编码
  shortName: string // 品牌简称
  url: string // 对应的网址
  picUrl: string // 品牌图片url
  sort: number // 品牌排序
  keywords: string // 关键字
  description: string // 品牌描述
  status: number // 状态 1 正常  0 停用
}

// 品牌 API
export const BrandApi = {
  // 查询品牌分页
  getBrandPage: async (params: any) => {
    return await request.get({ url: `/bproduct/brand/page`, params })
  },

  // 查询品牌详情
  getBrand: async (id: number) => {
    return await request.get({ url: `/bproduct/brand/get?id=` + id })
  },

  // 新增品牌
  createBrand: async (data: BrandVO) => {
    return await request.post({ url: `/bproduct/brand/create`, data })
  },

  // 修改品牌
  updateBrand: async (data: BrandVO) => {
    return await request.put({ url: `/bproduct/brand/update`, data })
  },

  // 删除品牌
  deleteBrand: async (id: number) => {
    return await request.delete({ url: `/bproduct/brand/delete?id=` + id })
  },

  // 导出品牌 Excel
  exportBrand: async (params) => {
    return await request.download({ url: `/bproduct/brand/export-excel`, params })
  },
}