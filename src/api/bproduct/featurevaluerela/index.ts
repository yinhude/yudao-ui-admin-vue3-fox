import request from '@/config/axios'

// 特征值关联 VO
export interface FeatureValueRelaVO {
  id: number // 主键
  relationId: number // 关联对象id（特征值）
  productId: number // 产品id
  type: number // 1 feature 特性   2 合规性
}

// 特征值关联 API
export const FeatureValueRelaApi = {
  // 查询特征值关联分页
  getFeatureValueRelaPage: async (params: any) => {
    return await request.get({ url: `/bproduct/feature-value-rela/page`, params })
  },

  // 查询特征值关联详情
  getFeatureValueRela: async (id: number) => {
    return await request.get({ url: `/bproduct/feature-value-rela/get?id=` + id })
  },

  // 新增特征值关联
  createFeatureValueRela: async (data: FeatureValueRelaVO) => {
    return await request.post({ url: `/bproduct/feature-value-rela/create`, data })
  },

  // 修改特征值关联
  updateFeatureValueRela: async (data: FeatureValueRelaVO) => {
    return await request.put({ url: `/bproduct/feature-value-rela/update`, data })
  },

  // 删除特征值关联
  deleteFeatureValueRela: async (id: number) => {
    return await request.delete({ url: `/bproduct/feature-value-rela/delete?id=` + id })
  },

  // 导出特征值关联 Excel
  exportFeatureValueRela: async (params) => {
    return await request.download({ url: `/bproduct/feature-value-rela/export-excel`, params })
  },
}