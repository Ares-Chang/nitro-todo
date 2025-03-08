import { checkUserExists, createUser } from '~/composables/users'
import { userCreateSchema } from '~/dtos/users'

defineRouteMeta({
  openAPI: {
    summary: '注册',
    description: '注册',
    tags: ['鉴权'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', example: '张三' },
              email: { type: 'string', example: 'test@example.com' },
              password: { type: 'string', example: '123456' },
              code: { type: 'string', example: '123456' },
            },
            required: ['name', 'email', 'password', 'code'],
          },
        },
      },
    },
    responses: {
      200: {
        description: '注册成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: '注册成功' },
              },
            },
          },
        },
      },
      400: {
        description: '注册失败',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 400 },
                message: { type: 'string', example: '邮箱已注册！' },
              },
            },
          },
        },
      },
    },
  },
})

export default defineEventHandler(async (event) => {
  const { name, email, password, code } = await readValidatedBody(event, userCreateSchema.omit({
    id: true,
    userId: true,
  }).parse)

  if (await checkUserExists(email))
    throw throwBadRequest('邮箱已注册！')

  const key = getRedisVerificationKey(email, 'register')

  const redisCode = await getRedisItem(key)

  if (Number(redisCode) !== Number(code))
    throw throwBadRequest('验证码错误！')

  const hashedPassword = await hashPassword(password)

  await createUser({ name, email, password: hashedPassword })

  await removeRedisItem(key)

  return {
    data: '注册成功',
  }
})
