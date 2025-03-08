defineRouteMeta({
  openAPI: {
    summary: '获取当前用户信息',
    description: '获取当前用户信息',
    tags: ['用户'],
    security: [{
      bearerAuth: [],
    }],
    responses: {
      200: {
        description: '获取成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '1234567890' },
                name: { type: 'string', example: '张三' },
                email: { type: 'string', example: 'test@example.com' },
                avatar: { type: 'string', example: 'https://example.com/avatar.png' },
                bio: { type: 'string', example: '个人简介' },
                createdAt: { type: 'string', example: '2021-01-01 12:00:00' },
                updatedAt: { type: 'string', example: '2021-01-01 12:00:00' },
              },
            },
          },
        },
      },
    },
  },
})
export default defineEventHandler(async (event) => {
  const user = useUser(event)

  return {
    id: user.userCredentials.userId,
    name: user.userProfiles.name,
    email: user.userCredentials.email,
    avatar: user.userProfiles.avatar,
    bio: user.userProfiles.bio,
    createdAt: user.userCredentials.createdAt,
    updatedAt: user.userCredentials.updatedAt,
  }
})
