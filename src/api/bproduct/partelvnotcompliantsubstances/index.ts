import request from '@/config/axios'

// elv不合规含量子 VO
export interface PartElvNotCompliantSubstancesVO {
  id: number // 主键id
  elvComplianceId: number // elvID
  substanceName: string // 子名称
}

// elv不合规含量子 API
export const PartElvNotCompliantSubstancesApi = {
  // 查询elv不合规含量子分页
  getPartElvNotCompliantSubstancesPage: async (params: any) => {
    return await request.get({ url: `/bproduct/part-elv-not-compliant-substances/page`, params })
  },

  // 查询elv不合规含量子详情
  getPartElvNotCompliantSubstances: async (id: number) => {
    return await request.get({ url: `/bproduct/part-elv-not-compliant-substances/get?id=` + id })
  },

  // 新增elv不合规含量子
  createPartElvNotCompliantSubstances: async (data: PartElvNotCompliantSubstancesVO) => {
    return await request.post({ url: `/bproduct/part-elv-not-compliant-substances/create`, data })
  },

  // 修改elv不合规含量子
  updatePartElvNotCompliantSubstances: async (data: PartElvNotCompliantSubstancesVO) => {
    return await request.put({ url: `/bproduct/part-elv-not-compliant-substances/update`, data })
  },

  // 删除elv不合规含量子
  deletePartElvNotCompliantSubstances: async (id: number) => {
    return await request.delete({ url: `/bproduct/part-elv-not-compliant-substances/delete?id=` + id })
  },

  // 导出elv不合规含量子 Excel
  exportPartElvNotCompliantSubstances: async (params) => {
    return await request.download({ url: `/bproduct/part-elv-not-compliant-substances/export-excel`, params })
  },
}