import request from '@/config/axios'

// 商品替代品 VO
export interface SimilarVO {
  id: number // 主键
  relationPn: string // 关联型号
  relationId: number // 关联对象id
  productId: number // 产品id
  type: number // 1.替代品 2.对配 3.配套
}

// 商品替代品 API
export const SimilarApi = {
  // 查询商品替代品分页
  getSimilarPage: async (params: any) => {
    return await request.get({ url: `/bproduct/similar/page`, params })
  },

  // 查询商品替代品详情
  getSimilar: async (id: number) => {
    return await request.get({ url: `/bproduct/similar/get?id=` + id })
  },

  // 新增商品替代品
  createSimilar: async (data: SimilarVO) => {
    return await request.post({ url: `/bproduct/similar/create`, data })
  },

  // 修改商品替代品
  updateSimilar: async (data: SimilarVO) => {
    return await request.put({ url: `/bproduct/similar/update`, data })
  },

  // 删除商品替代品
  deleteSimilar: async (id: number) => {
    return await request.delete({ url: `/bproduct/similar/delete?id=` + id })
  },

  // 导出商品替代品 Excel
  exportSimilar: async (params) => {
    return await request.download({ url: `/bproduct/similar/export-excel`, params })
  },
}