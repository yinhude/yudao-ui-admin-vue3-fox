import request from '@/config/axios'

// elv合规数据 VO
export interface PartElvComplianceVO {
  id: number // 主键id
  partId: number // part_id`
  complianceCode: string // ELV编码
  complianceDescription: string // 描述信息
  selfDescribingDesc: string // ELV详细描述
}

// elv合规数据 API
export const PartElvComplianceApi = {
  // 查询elv合规数据分页
  getPartElvCompliancePage: async (params: any) => {
    return await request.get({ url: `/bproduct/part-elv-compliance/page`, params })
  },

  // 查询elv合规数据详情
  getPartElvCompliance: async (id: number) => {
    return await request.get({ url: `/bproduct/part-elv-compliance/get?id=` + id })
  },

  // 新增elv合规数据
  createPartElvCompliance: async (data: PartElvComplianceVO) => {
    return await request.post({ url: `/bproduct/part-elv-compliance/create`, data })
  },

  // 修改elv合规数据
  updatePartElvCompliance: async (data: PartElvComplianceVO) => {
    return await request.put({ url: `/bproduct/part-elv-compliance/update`, data })
  },

  // 删除elv合规数据
  deletePartElvCompliance: async (id: number) => {
    return await request.delete({ url: `/bproduct/part-elv-compliance/delete?id=` + id })
  },

  // 导出elv合规数据 Excel
  exportPartElvCompliance: async (params) => {
    return await request.download({ url: `/bproduct/part-elv-compliance/export-excel`, params })
  },
}