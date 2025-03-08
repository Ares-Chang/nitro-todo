import { updateGroup } from '~/composables/groups'
import { groupsSelectSchema, groupsUpdateSchema } from '~/dtos/groups'

defineRouteMeta({
  openAPI: {
    summary: '更新分组',
    description: '更新分组',
    tags: ['分组'],
    security: [{
      bearerAuth: [],
    }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: '分组ID',
        required: true,
      },
    ],
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
                code: { type: 'number', example: 400 },
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
  const { id } = await getValidatedRouterParams(event, groupsSelectSchema.parse)
  const { name } = await readValidatedBody(event, groupsUpdateSchema.parse)

  await updateGroup(id, name!)
})
