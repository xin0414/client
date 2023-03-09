import React from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { openModal } from '@mantine/modals'
import { useForm } from '@mantine/form'

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from '@mantine/core'
import { Layout } from '~/components'
import { CheckServerUrl } from './check-server-url'
import {
  windowService,
  getServerUrl,
  GlobalService,
  RaysyncService,
} from '~/services'
import { AuthAPI, useAPI } from '~/http'
const SigninWrap = styled.div`
  width: calc(100vw - 60px);
`
export const SigninPage = () => {
  const navigateTo = useNavigate()
  const { auth } = GlobalService.useInject()
  const { server, attchServerEvents, setServerLoginInfo } =
    RaysyncService.useInject()
  const form = useForm({
    initialValues: {
      account: 'Xin',
      password: 'Ruiyun123',
      keepAlive: false,
    },
  })
  const LoginAPI = useAPI(AuthAPI.login, { manual: true })
  const handleSubmit = form.onSubmit(async (values) => {
    LoginAPI.run({ account: values.account, password: values.password }).then(
      async (res) => {
        if (res.result && res.data) {
          auth.setToken(res.data?.token)
          auth.setLoginInfo(res.data)
          await windowService.setNormalPageSize()
          await handleLogin(values.account, values.password)
          navigateTo('/file')
        }
      }
    )
  })
  const handleLogin = async (username: string, password: string) => {
    let spaceId = auth.currentSpaceId
    // 请求并设置空间id
    const spaceRes = await AuthAPI.getSpaceInfo()
    if (spaceRes.result && spaceRes.data) {
      const spaceInfo = spaceRes.data?.result
      auth.setSpaceInfo(spaceInfo)
      if (
        !auth.currentSpaceId ||
        spaceInfo.every((item) => item.id !== +auth.currentSpaceId)
      ) {
        const defaultId = spaceInfo.length && spaceInfo[0].id
        spaceId = defaultId
        defaultId && auth.setCurrentSpaceId(defaultId)
      }
    }
    // 设置用户信息
    const userInfoRes = await AuthAPI.getUserInfo(spaceId)
    if (userInfoRes.result && userInfoRes.data) {
      auth.setUserInfo(userInfoRes.data.user)
    }
    // 登录文件服务
    attchServerEvents()
    server?.login({ username, password, spaceId }).then((res) => {
      setServerLoginInfo(res.data)
      server.list('/')
    })
  }
  const checkServerUrl = () => {
    const serverUrl = getServerUrl()
    if (!serverUrl) {
      openModal({
        title: '请填写您的服务器地址',
        closeOnClickOutside: false,
        closeOnEscape: false,
        withCloseButton: false,
        centered: true,
        children: <CheckServerUrl />,
      })
    }
  }
  React.useEffect(checkServerUrl, [])
  return (
    <Layout hideSidebar>
      <SigninWrap>
        <Container size={480} my={40}>
          <Title
            align='center'
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            RAYSYNC
          </Title>

          <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
            <form onSubmit={handleSubmit}>
              <TextInput
                label='账户'
                placeholder='请输入您的账户'
                required
                mt='md'
                {...form.getInputProps('account')}
              />
              <PasswordInput
                label='密码'
                placeholder='请输入您的密码'
                required
                mt='md'
                {...form.getInputProps('password')}
              />
              <Group position='apart' mt='lg'>
                <Checkbox
                  label='保持登录'
                  sx={{ lineHeight: 1 }}
                  {...form.getInputProps('keepAlive', { type: 'checkbox' })}
                />
                <Anchor<'a'>
                  onClick={(event) => event.preventDefault()}
                  href='#'
                  size='sm'
                >
                  忘记密码?
                </Anchor>
              </Group>
              <Button
                loading={LoginAPI.loading}
                fullWidth
                mt='xl'
                type='submit'
              >
                登录
              </Button>
            </form>
          </Paper>
        </Container>
      </SigninWrap>
    </Layout>
  )
}
