import { getTodos } from '~/composables/todos'
import { todosSelectSchema } from '~/dtos/todos'

defineRouteMeta({
  openAPI: {
    summary: '获取待办事项列表',
    description: '获取待办事项列表',
    tags: ['待办事项'],
    security: [{
      bearerAuth: [],
    }],
    parameters: [
      {
        name: 'groupId',
        in: 'query',
        description: '分组ID',
      },
      {
        name: 'status',
        in: 'query',
        description: '状态',
      },
      {
        name: 'sort',
        in: 'query',
        description: '排序',
      },
      {
        name: 'order',
        in: 'query',
        description: '排序方向',
      },
    ],
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
                  id: { type: 'string', example: '1' },
                  title: { type: 'string', example: '待办事项' },
                  completed: { type: 'boolean', example: false },
                  createdAt: { type: 'string', example: '2021-01-01' },
                  updatedAt: { type: 'string', example: '2021-01-01' },
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
                code: { type: 'string', example: '400' },
                message: { type: 'string', example: '获取失败' },
              },
            },
          },
        },
      },
    },
  },
})
export default defineEventHandler(async (event) => {
  const { groupId, status, sort, order } = await getValidatedQuery(event, todosSelectSchema.parse)

  return getTodos({ groupId, status, sort, order })
})
