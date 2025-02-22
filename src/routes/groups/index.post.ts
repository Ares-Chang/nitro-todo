import { checkGroupExist, createGroup } from '~/composables/groups'
import { groupsCreateSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const { success, data, error } = await readValidatedBody(event, body => groupsCreateSchema.safeParse(body))

  if (!success)
    throw throwBadRequest(error?.issues[0].message)

  // 先检查是否存在
  const group = await checkGroupExist(data.name)
  if (group)
    throw throwBadRequest('分组已存在')

  try {
    await createGroup(data.name)
  }
  catch (error) {
    throw throwBadRequest(error instanceof Error ? error.message : '创建错误')
  }
})
