import React from 'react'
import styled from '@emotion/styled'
import { TitleBar } from './titlebar'
import { SideBar } from './sidebar'
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(p) => p.theme.colors.dark[9]};
`
const ContentWrap = styled.div`
  display: flex;
`
const Content = styled.div`
  padding: 30px 20px 20px;
  width: 100%;
`

interface Props extends React.PropsWithChildren {
  hideSidebar?: boolean
}

export const Layout = ({ children, hideSidebar = false }: Props) => {
  return (
    <Container>
      <TitleBar />
      <ContentWrap>
        {!hideSidebar && <SideBar />}
        <Content>{children}</Content>
      </ContentWrap>
    </Container>
  )
}
