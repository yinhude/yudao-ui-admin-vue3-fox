import request from '@/config/axios'

// 文档 VO
export interface DocumentsVO {
  id: number // 主键id
  productId: number // 产品id
  type: string // 类型
  revision: string // 产品id
  format: string // 格式
  language: string // 语言
  title: string // 标题
  name: string // 名称
  localType: string // 本地类型
  rawFileSize: string // 文件大小
  docNumber: string // 文件编号
  langCode: string // lang code
  viewableSize: string // 页面显示大小
  filename: string // 文件名称
  url: string // 路径
  minioUrl: string // 本地存储路径
}

// 文档 API
export const DocumentsApi = {
  // 查询文档分页
  getDocumentsPage: async (params: any) => {
    return await request.get({ url: `/bproduct/documents/page`, params })
  },

  // 查询文档详情
  getDocuments: async (id: number) => {
    return await request.get({ url: `/bproduct/documents/get?id=` + id })
  },

  // 新增文档
  createDocuments: async (data: DocumentsVO) => {
    return await request.post({ url: `/bproduct/documents/create`, data })
  },

  // 修改文档
  updateDocuments: async (data: DocumentsVO) => {
    return await request.put({ url: `/bproduct/documents/update`, data })
  },

  // 删除文档
  deleteDocuments: async (id: number) => {
    return await request.delete({ url: `/bproduct/documents/delete?id=` + id })
  },

  // 导出文档 Excel
  exportDocuments: async (params) => {
    return await request.download({ url: `/bproduct/documents/export-excel`, params })
  },
}