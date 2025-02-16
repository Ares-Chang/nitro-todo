import { eq } from 'drizzle-orm'
import { groups } from '~/db/schema/groups'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 先检查是否存在
  const group = await db.select().from(groups).where(eq(groups.name, body.name))
  if (group.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Group already exists',
    })
  }

  // 创建并返回
  const [{ id }] = await db.insert(groups).values(body).$returningId()

  const newGroup = await db.select({
    id: groups.id,
    name: groups.name,
    createdAt: groups.createdAt,
    updatedAt: groups.updatedAt,
  }).from(groups).where(eq(groups.id, id))

  return newGroup
})
