import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: '邮箱格式错误' }),
  password: z.string().min(8, { message: '密码长度至少为8位' }),
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string().nonempty({ message: 'refreshToken不能为空' }),
})
