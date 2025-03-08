import { deleteGroup } from '~/composables/groups'
import { groupsSelectSchema } from '~/dtos/groups'

defineRouteMeta({
  openAPI: {
    summary: '删除分组',
    description: '删除分组',
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
                code: { type: 'number', example: 400 },
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
  const { id } = await getValidatedRouterParams(event, groupsSelectSchema.parse)

  await deleteGroup(Number(id))
})
