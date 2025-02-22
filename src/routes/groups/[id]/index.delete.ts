import { deleteGroup } from '~/composables/groups'
import { groupsSelectSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, groupsSelectSchema.parse)

  await deleteGroup(Number(id))
})
