import request from '@/config/axios'

// 特征值 VO
export interface FeatureValueVO {
  id: number // 主键
  name: string // 名称
  dimValId: string // 特性值id
  displayValue: string // 展示值
  primarySourceId: string // 主键id
  keywords: string // 关键字
  value: string // 值
  system: string // 系统值
  unit: string // 单位
  sort: string // 排序
}

// 特征值 API
export const FeatureValueApi = {
  // 查询特征值分页
  getFeatureValuePage: async (params: any) => {
    return await request.get({ url: `/bproduct/feature-value/page`, params })
  },

  // 查询特征值详情
  getFeatureValue: async (id: number) => {
    return await request.get({ url: `/bproduct/feature-value/get?id=` + id })
  },

  // 新增特征值
  createFeatureValue: async (data: FeatureValueVO) => {
    return await request.post({ url: `/bproduct/feature-value/create`, data })
  },

  // 修改特征值
  updateFeatureValue: async (data: FeatureValueVO) => {
    return await request.put({ url: `/bproduct/feature-value/update`, data })
  },

  // 删除特征值
  deleteFeatureValue: async (id: number) => {
    return await request.delete({ url: `/bproduct/feature-value/delete?id=` + id })
  },

  // 导出特征值 Excel
  exportFeatureValue: async (params) => {
    return await request.download({ url: `/bproduct/feature-value/export-excel`, params })
  },
}