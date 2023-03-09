import { appWindow, LogicalSize } from '@tauri-apps/api/window'
import { isTauri } from '~/utils'
class WindowService {
  init() {
    this.setLoginWindowSize()
  }

  async setLoginWindowSize() {
    if (isTauri) {
      await appWindow.setMinSize(new LogicalSize(500, 600))
      await appWindow.setMaxSize(new LogicalSize(500, 600))
      await appWindow.setSize(new LogicalSize(500, 600))
    }
  }
  async setNormalPageSize() {
    if (isTauri) {
      await appWindow.setSize(new LogicalSize(1050, 600))
      await appWindow.setMinSize(new LogicalSize(600, 500))
      await appWindow.setMaxSize(new LogicalSize(1200, 800))
    }
  }
}

export const windowService = new WindowService()
