import { updateTodoStatus } from '~/composables/todos'
import { todosIdSchema, todosStatusSchema } from '~/dtos/todos'

defineRouteMeta({
  openAPI: {
    summary: '更新待办事项状态',
    description: '更新待办事项状态',
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
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: { type: 'string', enum: ['active', 'completed'], example: 'active' },
            },
            required: ['status'],
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
                message: { type: 'string', example: '更新成功' },
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
                message: { type: 'string', example: '更新失败' },
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
  const { status } = await readValidatedBody(event, todosStatusSchema.parse)

  await updateTodoStatus(id, status)
})
