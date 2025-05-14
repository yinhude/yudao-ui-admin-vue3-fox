import request from '@/config/axios'

// reach合规性 VO
export interface PartReachCompliancesVO {
  id: number // 主键id
  partId: number // partid
  reachCmpl: string // 法规信息
  candidateDate: string // 发布日期
  declarationDate: string // 更新日期
  declarationCode: string // code
  containsReach: string // 超出限值
  declDateFlag: boolean // decl_date_flag
  candDateFlag: boolean // cand_date_flag
}

// reach合规性 API
export const PartReachCompliancesApi = {
  // 查询reach合规性分页
  getPartReachCompliancesPage: async (params: any) => {
    return await request.get({ url: `/bproduct/part-reach-compliances/page`, params })
  },

  // 查询reach合规性详情
  getPartReachCompliances: async (id: number) => {
    return await request.get({ url: `/bproduct/part-reach-compliances/get?id=` + id })
  },

  // 新增reach合规性
  createPartReachCompliances: async (data: PartReachCompliancesVO) => {
    return await request.post({ url: `/bproduct/part-reach-compliances/create`, data })
  },

  // 修改reach合规性
  updatePartReachCompliances: async (data: PartReachCompliancesVO) => {
    return await request.put({ url: `/bproduct/part-reach-compliances/update`, data })
  },

  // 删除reach合规性
  deletePartReachCompliances: async (id: number) => {
    return await request.delete({ url: `/bproduct/part-reach-compliances/delete?id=` + id })
  },

  // 导出reach合规性 Excel
  exportPartReachCompliances: async (params) => {
    return await request.download({ url: `/bproduct/part-reach-compliances/export-excel`, params })
  },
}