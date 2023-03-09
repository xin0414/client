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
import { windowService, GlobalService } from './services'
import App from './App'
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <SigninPage />,
//   },
//   {
//     path: '/file',
//     element: <FilePage />,
//   },
//   {
//     path: '/transfer-list',
//     element: <TransferListPage />,
//   },
//   {
//     path: '/settings',
//     element: <SettingsPage />,
//   },
//   {
//     path: '/profile',
//     element: <ProfilePage />,
//   },
// ])

// const App = GlobalService.connect(() => {
//   return (
//     <NotificationsProvider>
//       <ModalsProvider>
//         <RouterProvider router={router} />
//       </ModalsProvider>
//     </NotificationsProvider>
//   )
//   // return <RouterProvider router={router} />
// })

function render() {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

const bootstrap = async () => {
  await windowService.init()
  render()
}

bootstrap()
