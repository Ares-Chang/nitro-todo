import { deleteGroup } from '~/composables/groups'
import { groupsSelectSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParams(event, groupsSelectSchema.parse)

  try {
    await deleteGroup(Number(id))
  }
  catch {
    throw throwBadRequest('删除失败')
  }
})
