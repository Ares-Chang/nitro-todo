import type { SignOptions } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

// 定义 Token 载荷类型
interface JwtPayload {
  id: string
  name: string
}

/**
 * 签发 Token
 * @param payload 载荷
 * @param expiresIn 过期时间，默认 15 分钟
 * @returns Token
 */
export function signToken(payload: JwtPayload, expiresIn: SignOptions['expiresIn'] = '15m'): string {
  const secret = useRuntimeConfig().JWT_SECRET

  return jwt.sign(payload, secret, { expiresIn })
}

/**
 * 验证 Token
 * @param token 令牌
 * @returns Token 载荷
 */
export function verifyToken(token: string): JwtPayload {
  const secret = useRuntimeConfig().JWT_SECRET

  try {
    return jwt.verify(token, secret) as JwtPayload
  }
  catch (error) {
    console.error(error)
    throw throwUnauthorized('无效的 Token')
  }
}
