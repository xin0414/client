import React from 'react'
import styled from '@emotion/styled'
import { Menu, ActionIcon } from '@mantine/core'
import {
  IconPlus,
  IconFileDescription,
  IconFolderMinus,
  IconFolderPlus,
} from '@tabler/icons-react'
import { mkdir } from './operations'

export const ActionButton = () => {
  return (
    <Menu shadow='md' trigger='hover'>
      <Menu.Target>
        <ActionIcon
          color='orange'
          gradient={{ from: '#F76707', to: '#FFD8A8', deg: 180 }}
          radius='lg'
          size='lg'
          variant='filled'
        >
          <IconPlus />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconFileDescription size={14} />}>上传文件</Menu.Item>
        <Menu.Item icon={<IconFolderMinus size={14} />}>上传文件夹</Menu.Item>
        <Menu.Item
          icon={<IconFolderPlus size={14} />}
          onClick={() => {
            mkdir()
          }}
        >
          新建文件夹
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
