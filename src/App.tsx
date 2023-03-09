import React from 'react'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SigninPage, ProfilePage } from './pages/auth'
import { FilePage } from './pages/file'
import { TransferListPage } from './pages/transfer-list'
import { SettingsPage } from './pages/settings'
import { RaysyncService, GlobalService } from './services'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SigninPage />,
  },
  {
    path: '/file',
    element: <FilePage />,
  },
  {
    path: '/transfer-list',
    element: <TransferListPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
])

const App = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        primaryColor: 'orange',
        globalStyles: (theme) => ({
          body: {
            ...theme.fn.fontStyles(),
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            color: theme.colorScheme === 'dark' ? '#fff' : theme.black,
            '::selection': { background: 'transparent' },
          },
        }),
      }}
    >
      <NotificationsProvider position='top-center'>
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default GlobalService.connect(RaysyncService.connect(App))
