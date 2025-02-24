import { compare, hash } from 'bcryptjs'

/**
 * 哈希密码
 * @param password 密码
 * @returns 哈希后的密码
 */
export async function hashPassword(password: string) {
  return hash(password, 10)
}

/**
 * 验证密码
 * @param password 密码
 * @param hashedPassword 哈希后的密码
 * @returns 是否匹配
 */
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}
