import { ResponseCode, SpecialCode } from './code-msg-map'
export type BaseResponse<T = unknown> = {
  result: boolean
  code: ResponseCode | SpecialCode
  value: string
  data?: T
  message: string
}
export interface Page {
  current: number
  pages: number
  size: number
  total?: number
}
export interface PageParams {
  page?: number
  per_page?: number
  totalCount?: number
  size?: number
  pageNum?: number
  pageSize?: number
}
