import request from '@/config/axios'

// 特征值分组 VO
export interface FeatureGroupVO {
  id: number // 主键
  featureSourceId: string // 展示值
  sort: number // 排序
  label: string // 展示值
}

// 特征值分组 API
export const FeatureGroupApi = {
  // 查询特征值分组分页
  getFeatureGroupPage: async (params: any) => {
    return await request.get({ url: `/bproduct/feature-group/page`, params })
  },

  // 查询特征值分组详情
  getFeatureGroup: async (id: number) => {
    return await request.get({ url: `/bproduct/feature-group/get?id=` + id })
  },

  // 新增特征值分组
  createFeatureGroup: async (data: FeatureGroupVO) => {
    return await request.post({ url: `/bproduct/feature-group/create`, data })
  },

  // 修改特征值分组
  updateFeatureGroup: async (data: FeatureGroupVO) => {
    return await request.put({ url: `/bproduct/feature-group/update`, data })
  },

  // 删除特征值分组
  deleteFeatureGroup: async (id: number) => {
    return await request.delete({ url: `/bproduct/feature-group/delete?id=` + id })
  },

  // 导出特征值分组 Excel
  exportFeatureGroup: async (params) => {
    return await request.download({ url: `/bproduct/feature-group/export-excel`, params })
  },
}