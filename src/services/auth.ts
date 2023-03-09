import { useLocalStorage } from '@mantine/hooks'
import { LoginInfo, SpaceInfo, UserInfo } from '~/http'
const AUTH_KEY = '__auth__'
const LOGIN_INFO_KEY = '__login_info__'
const USER_INFO_KEY = '__user_info__'
const CURRENT_SPACE_ID = '__CURRENT_SPACE_ID__'
const SPACE_INFO_KEY = '__space_info__'
export const getToken = () => window.localStorage.getItem(AUTH_KEY)

export const useAuth = () => {
  const [token, setToken] = useLocalStorage({ key: AUTH_KEY })
  const [loginInfo, setLoginInfo] = useLocalStorage<LoginInfo>({
    key: LOGIN_INFO_KEY,
  })
  const [userInfo, setUserInfo] = useLocalStorage<UserInfo>({
    key: USER_INFO_KEY,
  })
  const [spaceInfo, setSpaceInfo] = useLocalStorage<SpaceInfo[]>({
    key: SPACE_INFO_KEY,
  })
  const [currentSpaceId, setCurrentSpaceId] = useLocalStorage<number>({
    key: CURRENT_SPACE_ID,
  })
  return {
    token,
    setToken,
    userInfo,
    setUserInfo,
    loginInfo,
    setLoginInfo,
    currentSpaceId,
    setCurrentSpaceId,
    spaceInfo,
    setSpaceInfo,
  }
}
