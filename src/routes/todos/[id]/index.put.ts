import { updateTodo } from '~/composables/todos'
import { todosIdSchema, todosUpdateSchema } from '~/dtos/todos'

defineRouteMeta({
  openAPI: {
    summary: '更新待办事项',
    description: '更新待办事项',
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
              title: { type: 'string', example: '待办事项' },
              content: { type: 'string', example: '待办事项内容' },
              dueTime: { type: 'string', example: '2021-01-01' },
              groupId: { type: 'string', example: '1' },
            },
            required: ['title', 'groupId', 'dueTime', 'content'],
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
  const { title, content, dueTime, groupId } = await readValidatedBody(event, todosUpdateSchema.parse)

  await updateTodo(id, { title, content, dueTime, groupId })
})
