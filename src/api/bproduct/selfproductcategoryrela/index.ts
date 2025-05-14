import request from '@/config/axios'

// 产品和自有分类的关联性 VO
export interface SelfProductCategoryRelaVO {
  id: number // 主键
  relationId: number // 关联对象id
  productId: number // 产品id
  type: number // 1.分类 2.系列
}

// 产品和自有分类的关联性 API
export const SelfProductCategoryRelaApi = {
  // 查询产品和自有分类的关联性分页
  getSelfProductCategoryRelaPage: async (params: any) => {
    return await request.get({ url: `/bproduct/self-product-category-rela/page`, params })
  },

  // 查询产品和自有分类的关联性详情
  getSelfProductCategoryRela: async (id: number) => {
    return await request.get({ url: `/bproduct/self-product-category-rela/get?id=` + id })
  },

  // 新增产品和自有分类的关联性
  createSelfProductCategoryRela: async (data: SelfProductCategoryRelaVO) => {
    return await request.post({ url: `/bproduct/self-product-category-rela/create`, data })
  },

  // 修改产品和自有分类的关联性
  updateSelfProductCategoryRela: async (data: SelfProductCategoryRelaVO) => {
    return await request.put({ url: `/bproduct/self-product-category-rela/update`, data })
  },

  // 删除产品和自有分类的关联性
  deleteSelfProductCategoryRela: async (id: number) => {
    return await request.delete({ url: `/bproduct/self-product-category-rela/delete?id=` + id })
  },

  // 导出产品和自有分类的关联性 Excel
  exportSelfProductCategoryRela: async (params) => {
    return await request.download({ url: `/bproduct/self-product-category-rela/export-excel`, params })
  },
}