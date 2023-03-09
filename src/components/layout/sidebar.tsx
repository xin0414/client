import React from 'react'
import styled from '@emotion/styled'
import { useNavigate, useLocation } from 'react-router-dom'
import { windowService } from '~/services'
import { Avatar, Text, Divider, Menu, ActionIcon } from '@mantine/core'
import {
  IconFile,
  IconArrowsTransferDown,
  IconDotsCircleHorizontal,
  IconSettings,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react'
import { GlobalService } from '~/services'

const SideBarStyled = styled.div`
  position: relative;
  min-width: 200px;
  height: 100vh;
  padding-top: 30px;
  background-color: #222226;
`
const MenuStyled = styled.ul`
  padding: 10px;
`
const MenuItem = styled.li<{ actived?: boolean }>`
  height: 45px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  padding: 0 16px;
  margin-bottom: 4px;
  cursor: pointer;
  background-color: ${(p) => (p.actived ? '#3a3a3f' : 'unset')};
  svg {
    width: 20px;
    margin-right: 16px;
  }
  :hover {
    background-color: #3a3a3f;
  }
`
const UserBarWrap = styled.div`
  width: 200px;
  position: absolute;
  bottom: 0;
  left: 0;
`
const UserBar = styled.div`
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
  > svg {
    cursor: pointer;
  }
`
const menus = [
  {
    path: '/file',
    icon: <IconFile />,
    title: '文件',
  },
  {
    path: '/transfer-list',
    icon: <IconArrowsTransferDown />,
    title: '传输列表',
  },
]

export const SideBar = () => {
  const navigateTo = useNavigate()
  const location = useLocation()
  const { auth } = GlobalService.useInject()
  return (
    <SideBarStyled>
      <MenuStyled>
        {menus.map((menu) => (
          <MenuItem
            actived={location.pathname.startsWith(menu.path)}
            key={menu.path}
            onClick={() => {
              navigateTo(menu.path)
            }}
          >
            <>
              {menu.icon}
              <p>{menu.title}</p>
            </>
          </MenuItem>
        ))}
      </MenuStyled>
      <UserBarWrap>
        <Divider />
        <UserBar>
          <div>
            <Avatar color='blue.1' radius='xl'>
              {auth?.userInfo?.account?.substring(0, 1).toUpperCase()}
            </Avatar>
            <Text lineClamp={1} ml='sm' fw='bold'>
              {auth?.userInfo?.account}
            </Text>
          </div>
          <Menu shadow='md'>
            <Menu.Target>
              <ActionIcon>
                <IconDotsCircleHorizontal size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconSettings size={14} />}
                onClick={() => {
                  navigateTo('/settings')
                }}
              >
                设置
              </Menu.Item>
              <Menu.Item
                icon={<IconUserCircle size={14} />}
                onClick={() => {
                  navigateTo('/profile')
                }}
              >
                个人中心
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                icon={<IconLogout size={14} />}
                onClick={async () => {
                  await windowService.setLoginWindowSize()
                  navigateTo('/')
                }}
              >
                退出登录
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </UserBar>
      </UserBarWrap>
    </SideBarStyled>
  )
}
