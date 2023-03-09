import React from 'react'
import { TextInput, Button } from '@mantine/core'
import { toast } from '~/components'
import { closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { http } from '~/http'
import { GlobalService } from '~/services'

export const CheckServerUrl = () => {
  const { settings } = GlobalService.useInject()
  const form = useForm({
    initialValues: {
      serverUrl: '',
    },
    validate: {
      serverUrl: (value) =>
        /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(
          value
        )
          ? null
          : 'Invalid Url',
    },
  })
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = form.onSubmit(({ serverUrl }) => {
    setLoading(true)
    http
      .get(`${serverUrl}/api/website/info`)
      .then((res) => {
        settings.setServerUrl(serverUrl)
        toast.success('保存成功！')
        closeAllModals()
      })
      .catch(() => {
        form.setFieldError('serverUrl', '请求不通，请重试！')
      })
      .finally(() => {
        setLoading(false)
      })
  })

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        withAsterisk
        label='服务器地址'
        placeholder='https://demo.raysync.cn:8091'
        data-autofocus
        {...form.getInputProps('serverUrl')}
      />

      <Button fullWidth loading={loading} type='submit' mt='xl'>
        保存
      </Button>
    </form>
  )
}
