import request from '@/config/axios'

// rohs VO
export interface PartChinaRohsComplianceVO {
  id: number // 主键id
  partId: number // part_id`
  epupComplianceCode: string // epup_code受限编码
  epupComplianceDesc: string // 描述
  epupImageUrl: string // 图片路径
}

// rohs API
export const PartChinaRohsComplianceApi = {
  // 查询rohs分页
  getPartChinaRohsCompliancePage: async (params: any) => {
    return await request.get({ url: `/bproduct/part-china-rohs-compliance/page`, params })
  },

  // 查询rohs详情
  getPartChinaRohsCompliance: async (id: number) => {
    return await request.get({ url: `/bproduct/part-china-rohs-compliance/get?id=` + id })
  },

  // 新增rohs
  createPartChinaRohsCompliance: async (data: PartChinaRohsComplianceVO) => {
    return await request.post({ url: `/bproduct/part-china-rohs-compliance/create`, data })
  },

  // 修改rohs
  updatePartChinaRohsCompliance: async (data: PartChinaRohsComplianceVO) => {
    return await request.put({ url: `/bproduct/part-china-rohs-compliance/update`, data })
  },

  // 删除rohs
  deletePartChinaRohsCompliance: async (id: number) => {
    return await request.delete({ url: `/bproduct/part-china-rohs-compliance/delete?id=` + id })
  },

  // 导出rohs Excel
  exportPartChinaRohsCompliance: async (params) => {
    return await request.download({ url: `/bproduct/part-china-rohs-compliance/export-excel`, params })
  },
}