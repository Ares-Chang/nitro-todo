import { verificationSchema } from '~/dtos/verifications'

defineRouteMeta({
  openAPI: {
    summary: '发送验证码',
    description: '发送验证码',
    tags: ['验证码'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'test@example.com' },
              type: { type: 'string', enum: ['register', 'resetPassword'], example: 'register' },
            },
            required: ['email', 'type'],
          },
        },
      },
    },
    responses: {
      200: {
        description: '发送成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: { type: 'string', example: '发送成功' },
              },
            },
          },
        },
      },
      400: {
        description: '发送失败',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 400 },
                message: { type: 'string', example: '验证码已发送！' },
              },
            },
          },
        },
      },
    },
  },
})

export default defineEventHandler(async (event) => {
  const { email, type } = await readValidatedBody(event, verificationSchema.parse)

  const key = getRedisVerificationKey(email, type)

  if (await getRedisItem(key))
    throw throwBadRequest('验证码已发送！')

  const code = generateCode()

  setRedisItem(key, code, 60 * 10)

  sendEmail(email, '验证码', `<p>您的验证码是: <strong>${code}</strong>. 它将在10分钟后过期。</p>`)

  return {
    data: '发送成功',
  }
})
