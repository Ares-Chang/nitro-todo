import { deleteTodo } from '~/composables/todos'
import { todosIdSchema } from '~/dtos/todos'

defineRouteMeta({
  openAPI: {
    summary: '删除待办事项',
    description: '删除待办事项',
    tags: ['待办事项'],
    security: [{
      bearerAuth: [],
    }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: '待办事项ID',
        required: true,
      },
    ],
    responses: {
      200: {
        description: '删除成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: '删除成功' },
              },
            },
          },
        },
      },
      400: {
        description: '删除失败',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'string', example: '400' },
                message: { type: 'string', example: '删除失败' },
              },
            },
          },
        },
      },
    },
  },
})

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, todosIdSchema.parse)

  await deleteTodo(id)
})
