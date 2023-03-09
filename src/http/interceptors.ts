import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'
import { SpecialUrl } from './code-msg-map'
import { getToken, getServerUrl } from '~/services/'

export function authentication(response: AxiosResponse) {
  return response
}
function handleErrorMessage(response: AxiosResponse) {
  if (response) {
    const code = response.data.code
  }
}
export function handleResponse(response: AxiosResponse) {
  if (response.config?.url && !SpecialUrl.includes(response.config?.url)) {
    handleErrorMessage(response)
  }
  return response
}
const ALLOW_RESPONSE_CODE = [400, 200]
export function handleError(error: AxiosError) {
  const response = error.response
  if (response) {
    if (ALLOW_RESPONSE_CODE.includes(response.status)) {
      handleErrorMessage(response)
    }
  }
  return Promise.resolve(error.response)
}

export function handleRequest(config: AxiosRequestConfig) {
  const token = getToken()
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token.replaceAll('"', '')}`
  }
  const serverUrl = getServerUrl()
  if (serverUrl) {
    config.url = `${new String(serverUrl).replaceAll('"', '')}${config.url!}`
  }
  return config
}
