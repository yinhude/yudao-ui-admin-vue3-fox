import request from '@/config/axios'

// rohs合规性 VO
export interface PartRohs10ComplianceVO {
  id: number // 主键id
  partId: number // part_id
  complianceCode: string // code
  complianceDescription: string // 描述
  selfDescribingDesc: string // 描述
  productCategoryEn: string // 分组信息
  productCategoryZh: string // 分组信息
}

// rohs合规性 API
export const PartRohs10ComplianceApi = {
  // 查询rohs合规性分页
  getPartRohs10CompliancePage: async (params: any) => {
    return await request.get({ url: `/bproduct/part-rohs10-compliance/page`, params })
  },

  // 查询rohs合规性详情
  getPartRohs10Compliance: async (id: number) => {
    return await request.get({ url: `/bproduct/part-rohs10-compliance/get?id=` + id })
  },

  // 新增rohs合规性
  createPartRohs10Compliance: async (data: PartRohs10ComplianceVO) => {
    return await request.post({ url: `/bproduct/part-rohs10-compliance/create`, data })
  },

  // 修改rohs合规性
  updatePartRohs10Compliance: async (data: PartRohs10ComplianceVO) => {
    return await request.put({ url: `/bproduct/part-rohs10-compliance/update`, data })
  },

  // 删除rohs合规性
  deletePartRohs10Compliance: async (id: number) => {
    return await request.delete({ url: `/bproduct/part-rohs10-compliance/delete?id=` + id })
  },

  // 导出rohs合规性 Excel
  exportPartRohs10Compliance: async (params) => {
    return await request.download({ url: `/bproduct/part-rohs10-compliance/export-excel`, params })
  },
}