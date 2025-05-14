import request from '@/config/axios'

// reach合规性 VO
export interface PartReachSvhcsVO {
  id: number // 主键id
  reachComplianceId: number // reach合规性表id
  svhcName: string // 具体信息
}

// reach合规性 API
export const PartReachSvhcsApi = {
  // 查询reach合规性分页
  getPartReachSvhcsPage: async (params: any) => {
    return await request.get({ url: `/bproduct/part-reach-svhcs/page`, params })
  },

  // 查询reach合规性详情
  getPartReachSvhcs: async (id: number) => {
    return await request.get({ url: `/bproduct/part-reach-svhcs/get?id=` + id })
  },

  // 新增reach合规性
  createPartReachSvhcs: async (data: PartReachSvhcsVO) => {
    return await request.post({ url: `/bproduct/part-reach-svhcs/create`, data })
  },

  // 修改reach合规性
  updatePartReachSvhcs: async (data: PartReachSvhcsVO) => {
    return await request.put({ url: `/bproduct/part-reach-svhcs/update`, data })
  },

  // 删除reach合规性
  deletePartReachSvhcs: async (id: number) => {
    return await request.delete({ url: `/bproduct/part-reach-svhcs/delete?id=` + id })
  },

  // 导出reach合规性 Excel
  exportPartReachSvhcs: async (params) => {
    return await request.download({ url: `/bproduct/part-reach-svhcs/export-excel`, params })
  },
}