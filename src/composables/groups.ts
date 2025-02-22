import { eq, isNull } from 'drizzle-orm'
import { groups } from '~/db/schema/groups'

/**
 * 检查分组是否存在
 * @param name 分组名称
 * @returns 是否存在
 */
export async function checkGroupExist(name: string) {
  const group = await db.query.groups.findFirst({
    where: eq(groups.name, name),
  })

  return Boolean(group)
}

/**
 * 获取所有未删除的分组
 * @returns 分组列表
 */
export async function getGroups() {
  return db.select().from(groups).where(isNull(groups.deletedAt))
}

/**
 * 创建分组
 * @param name 分组名称
 */
export async function createGroup(name: string) {
  await db.insert(groups).values({ name })
}

/**
 * 更新分组
 * @param id 分组ID
 * @param name 分组名称
 */
export async function updateGroup(id: number, name: string) {
  await db.update(groups).set({ name }).where(eq(groups.id, id))
}

/**
 * 删除分组
 * @param id 分组ID
 */
export async function deleteGroup(id: number) {
  // 处理更新失败的情况
  try {
    await db.update(groups).set({ deletedAt: new Date() }).where(eq(groups.id, id))
  }
  catch {
    throw throwInternalServerError('删除失败')
  }
}
