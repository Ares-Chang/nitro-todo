import { updateGroup } from '~/composables/groups'
import { groupsSelectSchema, groupsUpdateSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParams(event, (d) => {
    const { success, data, error } = groupsSelectSchema.safeParse(d)
    if (!success)
      throw BadRequest(error?.issues[0].message)

    return data.id
  })

  const { name } = await readValidatedBody(event, (body) => {
    const { success, data, error } = groupsUpdateSchema.safeParse(body)
    if (!success)
      throw BadRequest(error?.issues[0].message)

    return data
  })

  return updateGroup(Number(id), name!)
})
