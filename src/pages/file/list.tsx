import React from 'react'
import styled from '@emotion/styled'
import { FileType } from 'raysync-sdk'
import { ScrollArea, Flex, Text, ActionIcon, Menu } from '@mantine/core'
import {
  IconDots,
  IconTrash,
  IconFileDownload,
  IconShare,
  IconCloudUpload,
  IconFileArrowRight,
  IconCopy,
  IconAlignBoxLeftMiddle,
  IconBrandReason,
} from '@tabler/icons-react'
import { ReactComponent as IconFolder } from './folder.svg'
import { ReactComponent as IconFile } from './file.svg'
import { RaysyncService } from '~/services/'

const FileBox = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 10px;
  position: relative;
  > svg {
    width: 100px;
    height: 100px;
  }
  .mantine-Text-root {
    margin: 0 auto;
  }
  .mantine-ActionIcon-root {
    position: absolute;
    right: 4px;
    top: 4px;
    opacity: 0;
    svg {
      display: block;
      margin: 0 auto;
    }
  }
  :hover {
    background-color: #1f1f22;
    .mantine-ActionIcon-root {
      opacity: 1;
    }
  }
`

export const List = () => {
  const { fileInfo, navigation } = RaysyncService.useInject()
  return (
    <ScrollArea h={500} pt={40}>
      <Flex
        mih={50}
        miw={100}
        gap='lg'
        justify='flex-start'
        align='align-center'
        direction='row'
        wrap='wrap'
      >
        {fileInfo.map((file) => {
          return (
            <FileBox
              onClick={(e) => {
                if (file.file_type !== FileType.File) {
                  const path = `${navigation.currentPath}${
                    navigation.currentPath.endsWith('/') ? '' : '/'
                  }${file.name}`
                  navigation.navigateToPath(path)
                }
              }}
            >
              <Menu shadow='md' trigger='click' position='bottom-start'>
                <Menu.Target>
                  <ActionIcon
                    size='sm'
                    radius='md'
                    color='orange'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconDots size={14} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconShare size={14} />}
                    onClick={(e) => e.stopPropagation()}
                  >
                    分享
                  </Menu.Item>
                  <Menu.Item icon={<IconCloudUpload size={14} />}>
                    邀请上传
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item icon={<IconFileDownload size={14} />}>
                    下载
                  </Menu.Item>
                  <Menu.Item icon={<IconFileArrowRight size={14} />}>
                    移动
                  </Menu.Item>
                  <Menu.Item icon={<IconCopy size={14} />}>复制</Menu.Item>
                  <Menu.Item icon={<IconBrandReason size={14} />}>
                    重命名
                  </Menu.Item>
                  <Menu.Item icon={<IconAlignBoxLeftMiddle size={14} />}>
                    属性
                  </Menu.Item>
                  <Menu.Divider color='red' />
                  <Menu.Item color='red' icon={<IconTrash size={14} />}>
                    删除
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              {file.file_type === FileType.File ? <IconFile /> : <IconFolder />}
              <Text align='center' lineClamp={1} style={{ width: '100px' }}>
                {file.name}
              </Text>
            </FileBox>
          )
        })}
      </Flex>
    </ScrollArea>
  )
}
