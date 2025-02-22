import { checkGroupExist, createGroup } from '~/composables/groups'
import { groupsCreateSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  const { name } = await readValidatedBody(event, groupsCreateSchema.parse)

  // 先检查是否存在
  const group = await checkGroupExist(name)
  if (group)
    throw throwBadRequest('分组已存在')

  await createGroup(name)
})
