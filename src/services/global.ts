import { createService } from '~/utils/'
import { useSettings } from './settings'
import { useAuth } from './auth'

const useGlobalService = () => {
  const settings = useSettings()
  const auth = useAuth()

  return {
    settings,
    auth,
  }
}

export const GlobalService = createService(useGlobalService)
