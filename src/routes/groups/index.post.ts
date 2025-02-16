import { eq } from 'drizzle-orm'
import { groupsTable } from '~/db/schema/groups'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 先检查是否存在
  const group = await db.select().from(groupsTable).where(eq(groupsTable.name, body.name))
  if (group.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Group already exists',
    })
  }

  // 创建并返回
  const [{ id }] = await db.insert(groupsTable).values(body).$returningId()

  const newGroup = await db.select({
    id: groupsTable.id,
    name: groupsTable.name,
    createdAt: groupsTable.createdAt,
    updatedAt: groupsTable.updatedAt,
  }).from(groupsTable).where(eq(groupsTable.id, id))

  return newGroup
})
