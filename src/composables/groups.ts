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
  try {
    return db.select().from(groups).where(isNull(groups.deletedAt))
  }
  catch {
    throw throwInternalServerError('获取失败')
  }
}

/**
 * 创建分组
 * @param name 分组名称
 */
export async function createGroup(name: string) {
  try {
    await db.insert(groups).values({ name })
  }
  catch {
    throw throwInternalServerError('创建失败')
  }
}

/**
 * 更新分组
 * @param id 分组ID
 * @param name 分组名称
 */
export async function updateGroup(id: number, name: string) {
  try {
    await db.update(groups).set({ name, updatedAt: new Date() }).where(eq(groups.id, id))
  }
  catch {
    throw throwInternalServerError('更新失败')
  }
}

/**
 * 删除分组
 * @param id 分组ID
 */
export async function deleteGroup(id: number) {
  try {
    await db.update(groups).set({ deletedAt: new Date() }).where(eq(groups.id, id))
  }
  catch {
    throw throwInternalServerError('删除失败')
  }
}
