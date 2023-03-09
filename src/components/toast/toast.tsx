import { showNotification } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

export const toast = {
  success: (message: string) => {
    showNotification({
      message,
      icon: <IconCheck size={14} />,
      color: 'teal',
      radius: 'md',
      styles: () => ({
        root: {
          maxWidth: '300px',
          margin: '0 auto',
          paddingTop: '6px',
          paddingBottom: '6px',
        },
        icon: {
          width: '24px',
          height: '24px',
        },
      }),
    })
  },
  error: (message: string) => {
    showNotification({
      message,
      icon: <IconX size={14} />,
      color: 'real',
      radius: 'md',
      styles: () => ({
        root: {
          maxWidth: '300px',
          margin: '0 auto',
          paddingTop: '6px',
          paddingBottom: '6px',
        },
        icon: {
          width: '24px',
          height: '24px',
        },
      }),
    })
  },
}
