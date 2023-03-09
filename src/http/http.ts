import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BaseResponse } from './types'
import { resetParams } from './utils'
import { handleResponse, handleError, handleRequest } from './interceptors'
const flatAxiosResponse = <T>(response: AxiosResponse<BaseResponse<T>>) => ({
  ...response.data,
})

function createAxiosInstance({ headers, ...ohterConfig }: AxiosRequestConfig) {
  const axiosInstance = axios.create({
    baseURL: '/',
    timeout: 1000 * 10,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
    ...ohterConfig,
  })

  axiosInstance.interceptors.response.use(handleResponse, handleError)
  axiosInstance.interceptors.request.use(handleRequest as any)

  return {
    get: <R>(url: string, config?: AxiosRequestConfig) => {
      const params = resetParams(config?.params)
      return axiosInstance
        .get<BaseResponse<R>>(url, { ...config, params })
        .then(flatAxiosResponse)
    },
    download: <R>(url: string, config?: AxiosRequestConfig) => {
      return axiosInstance.get<BaseResponse<R>>(url, { ...config })
    },
    post: <R>(url: string, data: any = {}, config?: AxiosRequestConfig) =>
      axiosInstance
        .post<BaseResponse<R>>(url, data, config)
        .then(flatAxiosResponse),
    delete: <R>(url: string, data?: any, config?: AxiosRequestConfig) =>
      axiosInstance
        .delete<BaseResponse<R>>(url, { data, ...config })
        .then(flatAxiosResponse),
    patch: <R>(url: string, data?: any, config?: AxiosRequestConfig) =>
      axiosInstance.patch<BaseResponse<R>>(url, data).then(flatAxiosResponse),
    put: <R>(url: string, data?: any, config?: AxiosRequestConfig) =>
      axiosInstance
        .put<BaseResponse<R>>(url, data, config)
        .then(flatAxiosResponse),
    axios: axiosInstance,
  }
}
export const http = createAxiosInstance({
  baseURL: '/',
})
