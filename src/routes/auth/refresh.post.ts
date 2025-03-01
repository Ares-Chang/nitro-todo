import { refreshTokenSchema } from '~/dtos/auth'

export default defineEventHandler(async (event) => {
  const { refreshToken } = await readValidatedBody(event, refreshTokenSchema.parse)

  const user = event.context.user

  const key = getRedisRefreshTokenKey(user.userCredentials.userId)
  const cachedRefreshToken = await getRedisItem(key)

  if (!cachedRefreshToken)
    throw throwUnauthorized('请先登录')

  if (cachedRefreshToken !== refreshToken)
    throw throwUnauthorized('token 错误')

  const token = useToken(user)

  return {
    data: token,
    message: '登录成功',
  }
})
