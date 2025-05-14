import request from '@/config/axios'

// 特征 VO
export interface FeatureVO {
  id: number // 主键
  originId: string // 元数据id
  code: string // 编码
  displayValue: string // 展示值
  numeric: number // 是否是数值
  filterOnly: number // 是否支持筛选
  sort: number // 排序
  attributeType: string // 未知参数
  primaryFlag: number // 主要参数
  primarySourceId: string // 主要字段
  helpInfoVailable: string // 未知参数
  uom: number // 未知
  uiWidget: string // 未知
  showInCompareView: string // 展示
  label: string // 展示值
  type: number // 1:primary 2:normal
}

// 特征 API
export const FeatureApi = {
  // 查询特征分页
  getFeaturePage: async (params: any) => {
    return await request.get({ url: `/bproduct/feature/page`, params })
  },

  // 查询特征详情
  getFeature: async (id: number) => {
    return await request.get({ url: `/bproduct/feature/get?id=` + id })
  },

  // 新增特征
  createFeature: async (data: FeatureVO) => {
    return await request.post({ url: `/bproduct/feature/create`, data })
  },

  // 修改特征
  updateFeature: async (data: FeatureVO) => {
    return await request.put({ url: `/bproduct/feature/update`, data })
  },

  // 删除特征
  deleteFeature: async (id: number) => {
    return await request.delete({ url: `/bproduct/feature/delete?id=` + id })
  },

  // 导出特征 Excel
  exportFeature: async (params) => {
    return await request.download({ url: `/bproduct/feature/export-excel`, params })
  },
}