import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { z } from 'zod'
import { userCredentials, userProfiles } from '~/db/schema/user'

const passwordSchema = z.string()
  .min(8, '密码不能少于 8 位')
  .max(20, '密码不能超过 20 位')
  .nonempty('密码不能为空')

const userProfilesSchema = createInsertSchema(userProfiles, {
  name: schema => schema.nonempty('用户名不能为空'),
})
const userCredentialsSchema = createInsertSchema(userCredentials, {
  email: schema => schema.email({ message: '邮箱格式错误' }).nonempty('邮箱不能为空'),
  password: passwordSchema,
})

export const userSchema = z.object({
  ...userProfilesSchema.shape,
  ...userCredentialsSchema.shape,
})

export const userCreateSchema = userSchema.merge(z.object({
  code: z.string().nonempty('验证码不能为空'),
}))

export const userUpdateSchema = createUpdateSchema(userProfiles, {
  name: schema => schema.nonempty('用户名不能为空'),
  avatar: schema => schema.url('头像格式错误'),
  bio: schema => schema.max(100, '个人简介不能超过 100 字'),
})

export const userUpdatePasswordSchema = z.object({
  password: passwordSchema,
  newPassword: passwordSchema,
  code: z.string().nonempty('验证码不能为空'),
})

export interface UserResult {
  userCredentials: typeof userCredentials.$inferSelect
  userProfiles: typeof userProfiles.$inferSelect
}
export type UserCreate = z.infer<typeof userCreateSchema>
