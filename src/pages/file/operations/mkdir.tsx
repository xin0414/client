import React from 'react'
import { Flex, Center, TextInput, Button, Container } from '@mantine/core'
import { openModal, closeAllModals } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { toast } from '~/components'
import { RaysyncService } from '~/services/'
import { ReactComponent as IconFolder } from '../folder.svg'

export const mkdir = () =>
  openModal({
    title: '新建文件夹',
    centered: true,
    size: 400,
    children: <MkdirContent />,
  })

const MkdirContent = () => {
  const { server, navigation } = RaysyncService.useInject()
  const [loading, setLoading] = React.useState(false)
  const form = useForm({
    initialValues: {
      name: '',
    },
  })
  const handleSubmit = form.onSubmit(({ name }) => {
    setLoading(true)
    server?.mkdir(name, navigation.currentPath).then((res) => {
      setLoading(false)
      if (res.success) {
        toast.success('新建成功！')
        closeAllModals()
        server.list(navigation.currentPath)
      }
    })
  })

  return (
    <Flex wrap='wrap'>
      <Center w='100%'>
        <IconFolder />
      </Center>
      <Container w='100%' mt={30}>
        <form onSubmit={handleSubmit}>
          <TextInput
            withAsterisk
            placeholder='文件夹名称'
            data-autofocus
            {...form.getInputProps('name')}
          />

          <Button fullWidth loading={loading} type='submit' mt='xl'>
            保存
          </Button>
        </form>
      </Container>
    </Flex>
  )
}
