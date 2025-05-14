import request from '@/config/axios'

// rohs不符合的含量 VO
export interface PartRohs10NotCompliantSubstancesVO {
  id: number // 主键id
  rohs10ComplianceId: number // rohs
  substanceName: string // 子系列名称
  containsSubstance: string // 包含的子系列
}

// rohs不符合的含量 API
export const PartRohs10NotCompliantSubstancesApi = {
  // 查询rohs不符合的含量分页
  getPartRohs10NotCompliantSubstancesPage: async (params: any) => {
    return await request.get({ url: `/bproduct/part-rohs10-not-compliant-substances/page`, params })
  },

  // 查询rohs不符合的含量详情
  getPartRohs10NotCompliantSubstances: async (id: number) => {
    return await request.get({ url: `/bproduct/part-rohs10-not-compliant-substances/get?id=` + id })
  },

  // 新增rohs不符合的含量
  createPartRohs10NotCompliantSubstances: async (data: PartRohs10NotCompliantSubstancesVO) => {
    return await request.post({ url: `/bproduct/part-rohs10-not-compliant-substances/create`, data })
  },

  // 修改rohs不符合的含量
  updatePartRohs10NotCompliantSubstances: async (data: PartRohs10NotCompliantSubstancesVO) => {
    return await request.put({ url: `/bproduct/part-rohs10-not-compliant-substances/update`, data })
  },

  // 删除rohs不符合的含量
  deletePartRohs10NotCompliantSubstances: async (id: number) => {
    return await request.delete({ url: `/bproduct/part-rohs10-not-compliant-substances/delete?id=` + id })
  },

  // 导出rohs不符合的含量 Excel
  exportPartRohs10NotCompliantSubstances: async (params) => {
    return await request.download({ url: `/bproduct/part-rohs10-not-compliant-substances/export-excel`, params })
  },
}