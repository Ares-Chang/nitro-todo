import type { UserCreate, UserResult } from '~/dtos/users'
import { isEmail } from '@areschang/utils'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import { userCredentials, userProfiles } from '~/db/schema/user'

/**
 * 检查用户是否存在
 * @param email 邮箱
 * @returns 用户是否存在
 */
export async function checkUserExists(email: string) {
  try {
    const user = await db.select().from(userCredentials).where(eq(userCredentials.email, email))
    return user.length > 0
  }
  catch (error) {
    console.error(error)
    throw throwInternalServerError('检查用户是否存在失败')
  }
}

/**
 * 创建用户
 * @param user 用户
 */
export async function createUser(user: Omit<UserCreate, 'id' | 'userId' | 'code'>) {
  try {
    await db.transaction(async (tx) => {
      const id = nanoid()
      await tx.insert(userProfiles).values({ id, ...user })
      await tx.insert(userCredentials).values({ userId: id, ...user })
    })
  }
  catch (error) {
    console.error(error)
    throw throwInternalServerError('创建用户失败')
  }
}

export function getUser(id: string): Promise<UserResult | undefined>
export function getUser(email: string): Promise<UserResult | undefined>
/**
 * 获取用户
 * @param param 用户ID或邮箱
 * @returns 用户
 */
export async function getUser(param: string): Promise<UserResult | undefined> {
  try {
    const isId = !isEmail(param)

    const condition = isId
      ? eq(userCredentials.userId, param)
      : eq(userCredentials.email, param)

    return await db.select({
      userCredentials,
      userProfiles,
    })
      .from(userCredentials)
      .innerJoin(userProfiles, eq(userCredentials.userId, userProfiles.id))
      .where(condition)
      .then(result => result[0])
  }
  catch (error) {
    console.error(error)
    throw throwInternalServerError('获取用户失败')
  }
}

/**
 * 更新用户
 * @param id 用户ID
 * @param user 用户
 */
export async function updateUser(id: string, user: Partial<UserResult['userProfiles']>) {
  try {
    await db.update(userProfiles).set({
      ...user,
      updatedAt: new Date(),
    }).where(eq(userProfiles.id, id))
  }
  catch (error) {
    console.error(error)
    throw throwInternalServerError('更新用户失败')
  }
}

/**
 * 更新用户密码
 * @param id 用户ID
 * @param password 密码
 */
export async function updateUserPassword(id: string, password: string) {
  try {
    await db.update(userCredentials).set({ password }).where(eq(userCredentials.userId, id))
  }
  catch (error) {
    console.error(error)
    throw throwInternalServerError('更新用户密码失败')
  }
}
