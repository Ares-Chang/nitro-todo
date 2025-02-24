import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { userCredentials, userProfiles } from '~/db/schema/user'

const userProfilesSchema = createInsertSchema(userProfiles, {
  name: schema => schema.nonempty('用户名不能为空'),
})
const userCredentialsSchema = createInsertSchema(userCredentials, {
  email: schema => schema.nonempty('邮箱不能为空'),
  password: schema => schema.nonempty('密码不能为空'),
})

export const userCreateSchema = z.object({
  ...userProfilesSchema.shape,
  ...userCredentialsSchema.shape,
})

export type UserCreate = z.infer<typeof userCreateSchema>
