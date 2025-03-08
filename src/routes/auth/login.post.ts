import { nid } from '@areschang/utils'
import { getUser } from '~/composables/users'
import { loginSchema } from '~/dtos/auth'

defineRouteMeta({
  openAPI: {
    summary: '登录',
    description: '登录',
    tags: ['鉴权'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'test@example.com' },
              password: { type: 'string', example: 'password' },
            },
            required: ['email', 'password'],
          },
        },
      },
    },
    responses: {
      200: {
        description: '登录成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  type: 'object',
                  properties: {
                    token: { type: 'string', example: 'token' },
                    refreshToken: { type: 'string', example: 'refreshToken' },
                  },
                },
                message: { type: 'string', example: '登录成功' },
              },
            },
          },
        },
      },
      400: {
        description: '登录失败',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 400 },
                message: { type: 'string', example: '用户不存在' },
              },
            },
          },
        },
      },
      401: {
        description: '密码错误',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 401 },
                message: { type: 'string', example: '密码错误' },
              },
            },
          },
        },
      },
    },
  },
})
export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, loginSchema.parse)

  const user = await getUser(email)

  if (!user)
    throw throwBadRequest('用户不存在')

  const isPasswordMatch = await verifyPassword(password, user.userCredentials.password)

  if (!isPasswordMatch)
    throw throwUnauthorized('密码错误')

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
