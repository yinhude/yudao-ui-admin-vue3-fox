import request from '@/config/axios'

// 商品系列 VO
export interface ProductVO {
  id: number // 主键id
  originId: string // 元数据id
  img: string // 图片地址
  partType: string // 1:regular:产品  2:model:归类
  brandId: number // 品牌id
  selfCategoryId: number // 平台自身分类、系列id
  parentCategoryId: number // 父级分类id
  description: string // 描述
  friendlyDescription: string // 友好的描述
  tcpn: string // 产品型号
  elvCompliance: string // elv描述
  productOwningProfitCenter: string // elv描述
  replacementProductExists: number // 替代品是否存在
  attributeName: string // 属性
  buName: string // 未知字段
  seriesId: number // 系列id
  familyId: number // 家族描述id
  rohsCompliance: string // 合规性
  marketingPartNumber: string // 内部型号
  milspecNumber: string // 军用型号
  marketingPartNumNormalized: string // 型号
  status: number // 状态 1 正常  0 停用
}

// 商品系列 API
export const ProductApi = {
  // 查询商品系列分页
  getProductPage: async (params: any) => {
    return await request.get({ url: `/bproduct/product/page`, params })
  },

  // 查询商品系列详情
  getProduct: async (id: number) => {
    return await request.get({ url: `/bproduct/product/get?id=` + id })
  },

  // 新增商品系列
  createProduct: async (data: ProductVO) => {
    return await request.post({ url: `/bproduct/product/create`, data })
  },

  // 修改商品系列
  updateProduct: async (data: ProductVO) => {
    return await request.put({ url: `/bproduct/product/update`, data })
  },

  // 删除商品系列
  deleteProduct: async (id: number) => {
    return await request.delete({ url: `/bproduct/product/delete?id=` + id })
  },

  // 导出商品系列 Excel
  exportProduct: async (params) => {
    return await request.download({ url: `/bproduct/product/export-excel`, params })
  },
}