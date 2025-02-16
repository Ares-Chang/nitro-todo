import { eq } from 'drizzle-orm'
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
 * 获取指定分组
 * @param id 分组ID
 * @returns 分组
 */
export async function getGroup(id: number) {
  // 去除deletedAt字段
  const group = await db.query.groups.findFirst({
    where: eq(groups.id, id),
    columns: {
      deletedAt: false,
    },
  })

  return group
}

/**
 * 创建分组
 * @param name 分组名称
 * @returns 分组
 */
export async function createGroup(name: string) {
  const [{ id }] = await db.insert(groups).values({ name }).$returningId()

  return getGroup(id)
}
