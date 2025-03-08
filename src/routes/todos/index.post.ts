import { createTodo } from '~/composables/todos'
import { todosCreateSchema } from '~/dtos/todos'

defineRouteMeta({
  openAPI: {
    summary: '创建待办事项',
    description: '创建待办事项',
    tags: ['待办事项'],
    security: [{
      bearerAuth: [],
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              title: { type: 'string', example: '待办事项' },
              content: { type: 'string', example: '待办事项内容' },
              groupId: { type: 'string', example: '1' },
              dueTime: { type: 'string', example: '2021-01-01' },
            },
            required: ['title'],
          },
        },
      },
    },
    responses: {
      200: {
        description: '创建成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string', example: '创建成功' },
              },
            },
          },
        },
      },
      400: {
        description: '创建失败',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'string', example: '400' },
                message: { type: 'string', example: '创建失败' },
              },
            },
          },
        },
      },
    },
  },
})

export default defineEventHandler(async (event) => {
  const { title, content, groupId, dueTime } = await readValidatedBody(event, todosCreateSchema.parse)

  await createTodo({ title, content, groupId, dueTime })
})
