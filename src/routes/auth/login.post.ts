import { nid } from '@areschang/utils'
import { getUser } from '~/composables/users'
import { loginSchema } from '~/dtos/auth'

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, loginSchema.parse)

  const user = await getUser(email)

  if (!user)
    throw throwBadRequest('用户不存在')

  const isPasswordMatch = await verifyPassword(password, user.userCredentials.password)

  if (!isPasswordMatch)
    throw throwBadRequest('密码错误')

  const token = useToken(user)

  const refreshToken = nid(32)

  const key = getRedisRefreshTokenKey(user.userCredentials.userId)
  await setRedisItem(key, refreshToken, 60 * 60 * 24 * 7)

  return {
    data: {
      token,
      refreshToken,
    },
    message: '登录成功',
  }
})
