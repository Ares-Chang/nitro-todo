defineRouteMeta({
  openAPI: {
    summary: '退出登录',
    description: '退出登录',
    tags: ['鉴权'],
    security: [{
      bearerAuth: [],
    }],
    responses: {
      200: {
        description: '退出成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: '退出成功' },
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

  const key = getRedisRefreshTokenKey(user.userCredentials.userId)
  await removeRedisItem(key)

  return {
    message: '退出成功',
  }
})
