import React from 'react'
import { Flex } from '@mantine/core'
import { Layout } from '~/components'
import { NavigationBar } from './navigation-bar'
import { List } from './list'
import { ActionButton } from './action-button'
export const FilePage = () => {
  return (
    <Layout>
      <Flex align='center' justify='space-between' miw={300} pr={50}>
        <NavigationBar />
        <ActionButton />
      </Flex>

      <List />
    </Layout>
  )
}
