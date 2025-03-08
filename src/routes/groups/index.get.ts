import { getGroups } from '~/composables/groups'

defineRouteMeta({
  openAPI: {
    summary: '获取分组列表',
    description: '获取分组列表',
    tags: ['分组'],
    security: [{
      bearerAuth: [],
    }],
    responses: {
      200: {
        description: '获取成功',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  name: { type: 'string', example: '分组名称' },
                  createdAt: { type: 'string', example: '2021-01-01 12:00:00' },
                  updatedAt: { type: 'string', example: '2021-01-01 12:00:00' },
                },
              },
            },
          },
        },
      },
      400: {
        description: '获取失败',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 400 },
                message: { type: 'string', example: '获取失败' },
              },
            },
          },
        },
      },
    },
  },
})

export default defineEventHandler(() => {
  return getGroups()
})
