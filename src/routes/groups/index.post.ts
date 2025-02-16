import { checkGroupExist, createGroup } from '~/composables/groups'
import { groupsCreateSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  try {
    const { success, data, error } = await readValidatedBody(event, body => groupsCreateSchema.safeParse(body))

    if (!success)
      throw new Error(error?.issues[0].message)

    // 先检查是否存在
    const group = await checkGroupExist(data.name)
    if (group)
      throw new Error('分组已存在')

    // 创建并返回
    const newGroup = await createGroup(data.name)

    return newGroup
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 400,
      statusMessage: error instanceof Error ? error.message : '创建错误',
    })
  }
})
