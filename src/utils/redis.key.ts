import type { VerificationType } from '~/dtos/verifications'

/**
 * 获取 Redis 验证码的键
 * @param email - 邮箱
 * @param type - 类型
 * @returns 返回 Redis 验证码的键
 */
export function getRedisVerificationKey(email: string, type: VerificationType) {
  return `verification:${type}:${email}`
}

/**
 * 获取 Redis 认证令牌的键
 * @param id - 用户 ID
 * @returns 返回 Redis 认证令牌的键
 */
export function getRedisRefreshTokenKey(id: string) {
  return `refresh:${id}`
}
