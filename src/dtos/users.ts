import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { userCredentials, userProfiles } from '~/db/schema/user'

const userProfilesSchema = createInsertSchema(userProfiles, {
  name: schema => schema.nonempty('用户名不能为空'),
})
const userCredentialsSchema = createInsertSchema(userCredentials, {
  email: schema => schema.email({ message: '邮箱格式错误' }).nonempty('邮箱不能为空'),
  password: schema => schema
    .min(8, '密码不能少于 8 位')
    .max(20, '密码不能超过 20 位')
    .nonempty('密码不能为空'),
})

export const userCreateSchema = z.object({
  ...userProfilesSchema.shape,
  ...userCredentialsSchema.shape,
  code: z.string().nonempty('验证码不能为空'),
})

export type UserCreate = z.infer<typeof userCreateSchema>
