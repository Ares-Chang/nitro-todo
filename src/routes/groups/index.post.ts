import { checkGroupExist, createGroup } from '~/composables/groups'
import { groupsCreateSchema } from '~/dtos/groups'

defineRouteMeta({
  openAPI: {
    summary: '创建分组',
    description: '创建分组',
    tags: ['分组'],
    security: [{
      bearerAuth: [],
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', example: '分组名称' },
            },
            required: ['name'],
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
  const { name } = await readValidatedBody(event, groupsCreateSchema.parse)

  // 先检查是否存在
  const group = await checkGroupExist(name)
  if (group)
    throw throwBadRequest('分组已存在')

  await createGroup(name)
})
