import request from '@/config/axios'

// 特征值关联 VO
export interface FeatureValueCategoryRelaVO {
  id: number // 主键
  relationId: number // 关联对象id（特征值）
  productId: number // 产品id
  type: number // 0.品牌 1.种类 2.系列
}

// 特征值关联 API
export const FeatureValueCategoryRelaApi = {
  // 查询特征值关联分页
  getFeatureValueCategoryRelaPage: async (params: any) => {
    return await request.get({ url: `/bproduct/feature-value-category-rela/page`, params })
  },

  // 查询特征值关联详情
  getFeatureValueCategoryRela: async (id: number) => {
    return await request.get({ url: `/bproduct/feature-value-category-rela/get?id=` + id })
  },

  // 新增特征值关联
  createFeatureValueCategoryRela: async (data: FeatureValueCategoryRelaVO) => {
    return await request.post({ url: `/bproduct/feature-value-category-rela/create`, data })
  },

  // 修改特征值关联
  updateFeatureValueCategoryRela: async (data: FeatureValueCategoryRelaVO) => {
    return await request.put({ url: `/bproduct/feature-value-category-rela/update`, data })
  },

  // 删除特征值关联
  deleteFeatureValueCategoryRela: async (id: number) => {
    return await request.delete({ url: `/bproduct/feature-value-category-rela/delete?id=` + id })
  },

  // 导出特征值关联 Excel
  exportFeatureValueCategoryRela: async (params) => {
    return await request.download({ url: `/bproduct/feature-value-category-rela/export-excel`, params })
  },
}