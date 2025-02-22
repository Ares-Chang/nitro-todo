import { updateGroup } from '~/composables/groups'
import { groupsSelectSchema, groupsUpdateSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const id = await getValidatedRouterParams(event, (d) => {
    const { success, data, error } = groupsSelectSchema.safeParse(d)
    if (!success)
      throw throwBadRequest(error?.issues[0].message)

    return data.id
  })

  const { name } = await readValidatedBody(event, (body) => {
    const { success, data, error } = groupsUpdateSchema.safeParse(body)
    if (!success)
      throw throwBadRequest(error?.issues[0].message)

    return data
  })

  try {
    await updateGroup(Number(id), name!)
  }
  catch {
    throw throwBadRequest('更新失败')
  }
})
