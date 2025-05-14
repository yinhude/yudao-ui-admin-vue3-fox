import request from '@/config/axios'

// 商品系列 VO
export interface CategoryVO {
  id: number // 主键id
  brandId: number // 品牌id(如果没有就是合适自己的分类数据)
  parentId: number // 父级id
  originId: string // 元数据id
  name: string // 名称
  keywords: string // 关键字
  shortName: string // 简称
  title: string // 标题
  facet: string // 元数据字段
  level: number // 层级
  categoryPicUrl: string // 系列图片url
  type: number // 0:初始化 	1:applications:标识应用场景	2:series:系列	3:standards：标准	4:industries：行业	5:category：分类	6:productfamilary	7:合适种类信息（level0->根路径 level1->元器件种类 level->2种类下的小种类 level->3系列）
  sort: number // 排序
  description: string // 描述
  status: number // 状态 1 正常  0 停用
}
// 商品系列 API
export const CategoryApi = {
    // 查询商品系列列表
  getCategoryList: async (params) => {
      return await request.get({ url: `/bproduct/category/list`, params })
  },
  // 查询商品系列分页
  getCategoryPage: async (params: any) => {
    return await request.get({ url: `/bproduct/category/page`, params })
  },

  // 查询商品系列详情
  getCategory: async (id: number) => {
    return await request.get({ url: `/bproduct/category/get?id=` + id })
  },

  // 新增商品系列
  createCategory: async (data: CategoryVO) => {
    return await request.post({ url: `/bproduct/category/create`, data })
  },

  // 修改商品系列
  updateCategory: async (data: CategoryVO) => {
    return await request.put({ url: `/bproduct/category/update`, data })
  },

  // 删除商品系列
  deleteCategory: async (id: number) => {
    return await request.delete({ url: `/bproduct/category/delete?id=` + id })
  },

  // 导出商品系列 Excel
  exportCategory: async (params) => {
    return await request.download({ url: `/bproduct/category/export-excel`, params })
  },
}
