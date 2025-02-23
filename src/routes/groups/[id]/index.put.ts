import { updateGroup } from '~/composables/groups'
import { groupsSelectSchema, groupsUpdateSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, groupsSelectSchema.parse)
  const { name } = await readValidatedBody(event, groupsUpdateSchema.parse)

  await updateGroup(id, name!)
})
