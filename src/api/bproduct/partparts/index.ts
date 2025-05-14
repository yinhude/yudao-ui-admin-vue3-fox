import request from '@/config/axios'

// part合规性 VO
export interface PartPartsVO {
  id: number // 主键id
  productId: number // 产品ID
  partNum: string // part_num
  leadFreeProcessCode: string // leaf code
  leadFreeProcessDesc: string // 描述
  materialDeclarationIndicator: string // material_declaration_indicator
}

// part合规性 API
export const PartPartsApi = {
  // 查询part合规性分页
  getPartPartsPage: async (params: any) => {
    return await request.get({ url: `/bproduct/part-parts/page`, params })
  },

  // 查询part合规性详情
  getPartParts: async (id: number) => {
    return await request.get({ url: `/bproduct/part-parts/get?id=` + id })
  },

  // 新增part合规性
  createPartParts: async (data: PartPartsVO) => {
    return await request.post({ url: `/bproduct/part-parts/create`, data })
  },

  // 修改part合规性
  updatePartParts: async (data: PartPartsVO) => {
    return await request.put({ url: `/bproduct/part-parts/update`, data })
  },

  // 删除part合规性
  deletePartParts: async (id: number) => {
    return await request.delete({ url: `/bproduct/part-parts/delete?id=` + id })
  },

  // 导出part合规性 Excel
  exportPartParts: async (params) => {
    return await request.download({ url: `/bproduct/part-parts/export-excel`, params })
  },
}