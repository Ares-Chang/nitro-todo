import { z } from 'zod'

const typeSchema = z.enum(['register', 'resetPassword'], { message: '类型错误' })

export const verificationSchema = z.object({
  email: z.string().email({ message: '邮箱格式错误' }).nonempty({ message: '邮箱不能为空' }),
  type: typeSchema,
})

export type VerificationType = z.infer<typeof typeSchema>
