import { eq } from 'drizzle-orm'
import { groups } from '~/db/schema/groups'
import { groupsCreateSchema } from '~/dtos/groups'

export default defineEventHandler(async (event) => {
  try {
    const { success, data, error } = await readValidatedBody(event, body => groupsCreateSchema.safeParse(body))

    if (!success)
      throw new Error(error?.issues[0].message)

    // 先检查是否存在
    const group = await db.select().from(groups).where(eq(groups.name, data.name))
    if (group.length)
      throw new Error('分组已存在')

    // 创建并返回
    const [{ id }] = await db.insert(groups).values({ name: data.name }).$returningId()

    const newGroup = await db.select({
      id: groups.id,
      name: groups.name,
      createdAt: groups.createdAt,
      updatedAt: groups.updatedAt,
    }).from(groups).where(eq(groups.id, id))

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
