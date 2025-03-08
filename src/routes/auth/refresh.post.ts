import { refreshTokenSchema } from '~/dtos/auth'

defineRouteMeta({
  openAPI: {
    summary: '刷新 token',
    description: '刷新 token',
    tags: ['鉴权'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              refreshToken: { type: 'string' },
            },
            required: ['refreshToken'],
          },
        },
      },
    },
    responses: {
      200: {
        description: '刷新 token 成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: { type: 'string', example: 'token' },
                message: { type: 'string', example: '刷新 token 成功' },
              },
            },
          },
        },
      },
      401: {
        description: '未授权',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'token 错误' },
              },
            },
          },
        },
      },
    },
  },
})

export default defineEventHandler(async (event) => {
  const { refreshToken } = await readValidatedBody(event, refreshTokenSchema.parse)

  const user = useUser(event)

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
