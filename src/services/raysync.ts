import React from 'react'
import {
  FileServer,
  ServerLoginResponse,
  ServerResponse,
  FileInfo,
} from 'raysync-sdk'
import { useDidUpdate } from '@mantine/hooks'
import { createService, useNavigation } from '~/utils'
import { GlobalService } from './global'

const getSortedList = (list: FileInfo[]) => {
  return (list || [])
    .sort((item1, item2) => {
      if (item1.name < item2.name) {
        return -1
      } else if (item1.name > item2.name) {
        return 1
      } else {
        return 0
      }
    })
    .sort((a, b) => b.file_type - a.file_type)
}

const useRaysync = () => {
  const { settings } = GlobalService.useInject()
  const serverRef = React.useRef<FileServer>()
  const navigation = useNavigation('/')
  const [serverLoginInfo, setServerLoginInfo] =
    React.useState<ServerLoginResponse['data']>()
  const [fileInfo, setFileInfo] = React.useState<FileInfo[]>([])

  if (!serverRef.current && settings.serverUrl) {
    const url = new URL(settings.serverUrl)
    const isHttps = url.protocol === 'https:'
    const serverUrl = `${isHttps ? 'wss' : 'ws'}://${url.hostname}:${
      isHttps ? 2481 : 2480
    }`
    serverRef.current = new FileServer({ url: serverUrl })
  }

  const server = serverRef.current
  const attchServerEvents = React.useCallback(() => {
    server?.on(ServerResponse.LIST, (res) => {
      const list = getSortedList(res.data)
      setFileInfo(list)
    })
  }, [server])

  useDidUpdate(() => {
    server?.list(navigation.currentPath)
  }, [navigation.currentPath])

  return {
    server,
    fileInfo,
    navigation,
    serverLoginInfo,
    setServerLoginInfo,
    attchServerEvents,
  }
}

export const RaysyncService = createService(useRaysync)
