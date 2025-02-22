import { deleteGroup } from '~/composables/groups'
import { groupsSelectSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParams(event, (d) => {
    const { success, data, error } = groupsSelectSchema.safeParse(d)
    if (!success)
      throw throwBadRequest(error?.issues[0].message)

    return data.id
  })

  return deleteGroup(Number(id))
})
