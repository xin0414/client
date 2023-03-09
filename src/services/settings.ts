import React from 'react'
import { useLocalStorage } from '@mantine/hooks'

const SERVER_URL_KEY = '__server_url__'
export const getServerUrl = () => window.localStorage.getItem(SERVER_URL_KEY)
export const useSettings = () => {
  const [serverUrl, setServerUrl] = useLocalStorage({ key: SERVER_URL_KEY })

  return {
    serverUrl,
    setServerUrl,
  }
}
