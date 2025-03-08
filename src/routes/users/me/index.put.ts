import { updateUser } from '~/composables/users'
import { userUpdateSchema } from '~/dtos/users'

defineRouteMeta({
  openAPI: {
    summary: '更新当前用户信息',
    description: '更新当前用户信息',
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
              name: { type: 'string', example: '张三' },
              avatar: { type: 'string', example: 'https://example.com/avatar.png' },
              bio: { type: 'string', example: '个人简介' },
            },
            required: ['name', 'avatar', 'bio'],
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
                message: { type: 'string', example: '更新用户信息成功' },
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
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
})
export default defineEventHandler(async (event) => {
  const { name, avatar, bio } = await readValidatedBody(event, userUpdateSchema.parse)

  const user = useUser(event)

  await updateUser(user.userCredentials.userId, {
    name,
    avatar,
    bio,
  })

  return {
    message: '更新用户信息成功',
  }
})
