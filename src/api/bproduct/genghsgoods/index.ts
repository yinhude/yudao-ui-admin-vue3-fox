import request from '@/config/axios'

// 脚本抓取控制 VO
export interface GenghsGoodsVO {
  id: number // 主键id
  pn: string // 型号
  status: boolean // 0,初始状态 1,完成抓取 2,任务失败
  brandId: number // 品牌id
}

// 脚本抓取控制 API
export const GenghsGoodsApi = {
  // 查询脚本抓取控制分页
  getGenghsGoodsPage: async (params: any) => {
    return await request.get({ url: `/bproduct/genghs-goods/page`, params })
  },

  // 查询脚本抓取控制详情
  getGenghsGoods: async (id: number) => {
    return await request.get({ url: `/bproduct/genghs-goods/get?id=` + id })
  },

  // 新增脚本抓取控制
  createGenghsGoods: async (data: GenghsGoodsVO) => {
    return await request.post({ url: `/bproduct/genghs-goods/create`, data })
  },

  // 修改脚本抓取控制
  updateGenghsGoods: async (data: GenghsGoodsVO) => {
    return await request.put({ url: `/bproduct/genghs-goods/update`, data })
  },

  // 删除脚本抓取控制
  deleteGenghsGoods: async (id: number) => {
    return await request.delete({ url: `/bproduct/genghs-goods/delete?id=` + id })
  },

  // 导出脚本抓取控制 Excel
  exportGenghsGoods: async (params) => {
    return await request.download({ url: `/bproduct/genghs-goods/export-excel`, params })
  },
}