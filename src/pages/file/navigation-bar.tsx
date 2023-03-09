import React from 'react'
import { Input, Group, ActionIcon } from '@mantine/core'
import { useDidUpdate } from '@mantine/hooks'
import { IconArrowLeft, IconArrowRight, IconRefresh } from '@tabler/icons-react'
import { RaysyncService } from '~/services/'

export const NavigationBar = () => {
  const { navigation } = RaysyncService.useInject()
  const [path, setPath] = React.useState('')
  useDidUpdate(() => {
    setPath(navigation.currentPath)
  }, [navigation.currentPath])
  return (
    <Group>
      <Input
        size='sm'
        width={300}
        placeholder='路径'
        value={path}
        onChange={(e) => setPath(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            navigation.navigateToPath(path)
          }
        }}
        rightSection={
          <ActionIcon
            variant='subtle'
            size='sm'
            onClick={() => {
              navigation.refresh()
            }}
          >
            <IconRefresh />
          </ActionIcon>
        }
      />

      <Group spacing='xs'>
        <ActionIcon
          size='lg'
          variant='outline'
          disabled={!navigation.canGoBack}
          onClick={() => {
            navigation.goBack()
          }}
        >
          <IconArrowLeft />
        </ActionIcon>
        <ActionIcon
          size='lg'
          variant='outline'
          disabled={!navigation.canGoForward}
          onClick={() => {
            navigation.goForward()
          }}
        >
          <IconArrowRight />
        </ActionIcon>
      </Group>
    </Group>
  )
}
