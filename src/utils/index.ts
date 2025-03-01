import type { H3Event } from 'h3'
import type { UserResult } from '~/dtos/users'
import process from 'node:process'

/**
 * 判断是否为开发环境
 */
export const isDev = process.env.NODE_ENV === 'development'

/**
 * 获取用户
 * @param event 请求上下文
 * @returns 用户
 */
export function useUser(event: H3Event): UserResult {
  const user = event.context.user as UserResult | null
  if (!user)
    throw throwUnauthorized('请先登录')

  return user
}

/**
 * 签发用户 Token
 * @param user 用户 数据
 * @returns Token
 */
export function useToken(user: UserResult) {
  const expiresIn = isDev ? '1d' : '15m'

  return signToken({
    id: user.userCredentials.userId,
    name: user.userProfiles.name,
  }, expiresIn)
}
