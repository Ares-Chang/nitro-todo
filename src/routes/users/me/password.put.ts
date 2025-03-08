import { updateUserPassword } from '~/composables/users'
import { userUpdatePasswordSchema } from '~/dtos/users'

defineRouteMeta({
  openAPI: {
    summary: '更新当前用户密码',
    description: '更新当前用户密码',
    tags: ['用户'],
    security: [{
      bearerAuth: [],
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              password: { type: 'string', example: '123456' },
              newPassword: { type: 'string', example: '654321' },
              code: { type: 'string', example: '123456' },
            },
            required: ['password', 'newPassword', 'code'],
          },
        },
      },
    },
    responses: {
      200: {
        description: '更新成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: '密码更新成功' },
              },
            },
          },
        },
      },
      400: {
        description: '更新失败',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'string', example: '400' },
                message: { type: 'string', enum: ['旧密码错误', '新密码不能与旧密码相同', '验证码错误！'], example: '旧密码错误' },
              },
            },
          },
        },
      },
    },
  },
})
export default defineEventHandler(async (event) => {
  const { password, newPassword, code } = await readValidatedBody(event, userUpdatePasswordSchema.parse)

  const user = useUser(event)

  if (!await verifyPassword(password, user.userCredentials.password))
    throw throwBadRequest('旧密码错误')

  const hashedPassword = await hashPassword(newPassword)

  if (password === newPassword)
    throw throwBadRequest('新密码不能与旧密码相同')

  const key = getRedisVerificationKey(user.userCredentials.email, 'resetPassword')

  const redisCode = await getRedisItem(key)

  if (Number(redisCode) !== Number(code))
    throw throwBadRequest('验证码错误！')

  await updateUserPassword(user.userCredentials.userId, hashedPassword)

  await removeRedisItem(key)

  return {
    message: '密码更新成功',
  }
})
