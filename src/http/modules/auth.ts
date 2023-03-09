import { http } from '~/http'
import Hash from '~/utils/hashids'

export const AuthAPI = {
  login: (params?: LoginParams) =>
    http.post<LoginInfo>('/api/user/login', {
      ...params,
      password: Hash.encode(params?.password || ''),
    }),
  getUserInfo: (spaceId: number) =>
    http.get<{ user: UserInfo }>('/api/user/info', {
      params: { spaceId },
    }),
  getSpaceInfo: () => http.get<{ result: SpaceInfo[] }>('/api/user/space'),
}

export interface LoginInfo {
  account: string
  accountType: number
  actived: number
  certSelect: number
  client_online: number
  client_version: string
  lockPeriod: number
  loginFailTimes: number
  maxLockTimes: number
  plat_version: number
  protocol_version: string
  reconnectcnt: number
  refresh_token: string
  softVersion: string
  syncSwitch: true
  token: string
  userId: number
  userPwdSwitch: boolean
  web_online: number
}
export type LoginParams = {
  account: string
  password: string
  emailCode?: string
  email?: string
}
export enum AccountType {
  Normal = 2,
  Domain = 4,
  Email = 5,
  Linux = 6,
}

export interface GroupInfo {
  create_time: string
  file_count: number
  folder_count: number
  forbidClientFilterSwitch: boolean
  groupCreateUser: string
  groupDownspeed: number
  groupHome: string
  groupId: number
  groupName: string
  groupPermission: number
  groupSuffixList: string
  groupUploadSuffixLimit: number
  groupUpspeed: number
  onlyNewFilesUp: boolean
  storageId: number
  syncSwitch: boolean
  transIgnoreReg: string
  transIgnoreRegSwitch: boolean
  transIgnoreSize: number
  transIgnoreSizeSwitch: boolean
  transSyncSwitch: boolean //同步频率开关
  transSyncTriggeringCondition: Record<string, any> //同步频率条件
  userHomeFlag: boolean
  userHomeSize: number
  userHomeTotal: number
  userGroupPermission: number
}
export interface UserInfo {
  account: string
  accountType: AccountType
  authWay: 0
  create_time: string
  downloadSpeed: number
  email: string
  emailSenderType: number
  exclude_list: string[]
  file_count: number
  folder_count: number
  forbidClientFilterSwitch: boolean
  groupList: GroupInfo[]
  home: string
  id: number
  name: string
  onlyNewFilesUp: false
  permission: number
  storageId: number
  suffixBlackList: string[]
  suffixList: string[]
  syncSwitch: boolean
  transIgnoreReg: string
  transIgnoreRegSwitch: boolean
  transIgnoreSize: number
  transIgnoreSizeSwitch: boolean
  uploadSpeed: number
  uploadSuffixLimit: number
  user_id: number
  whitelistIP: string
  whitelistIPSwitch: boolean
  emailAccount: string
  webEncryptedKey: string
  transSyncSwitch: boolean //同步频率开关
  transSyncTriggeringCondition: Record<string, any> //同步频率条件
}

export interface SpaceInfo {
  createTime: string
  creatorId: number
  id: number
  isDefault: boolean
  spaceName: string
  status: number
}
