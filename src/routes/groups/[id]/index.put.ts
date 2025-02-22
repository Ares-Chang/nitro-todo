import { updateGroup } from '~/composables/groups'
import { groupsSelectSchema, groupsUpdateSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParams(event, groupsSelectSchema.parse)
  const { name } = await readValidatedBody(event, groupsUpdateSchema.parse)

  try {
    await updateGroup(Number(id), name!)
  }
  catch {
    throw throwBadRequest('更新失败')
  }
})
