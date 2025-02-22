import { updateGroup } from '~/composables/groups'
import { groupsUpdateSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { success, data, error } = await readValidatedBody(event, body => groupsUpdateSchema.safeParse(body))

  if (!success)
    throw BadRequest(error?.issues[0].message)

  if (!id)
    throw BadRequest('id 不能为空')

  return updateGroup(Number(id), data.name!)
})
