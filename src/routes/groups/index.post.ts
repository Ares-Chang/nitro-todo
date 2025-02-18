import { checkGroupExist, createGroup } from '~/composables/groups'
import { groupsCreateSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const { success, data, error } = await readValidatedBody(event, body => groupsCreateSchema.safeParse(body))

  if (!success)
    throw BadRequest(error?.issues[0].message)

  // 先检查是否存在
  const group = await checkGroupExist(data.name)
  if (group)
    throw BadRequest('分组已存在')

  try {
    // 创建并返回
    const newGroup = await createGroup(data.name)

    return newGroup
  }
  catch (error) {
    throw BadRequest(error instanceof Error ? error.message : '创建错误')
  }
})
