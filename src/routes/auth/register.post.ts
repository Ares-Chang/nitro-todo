import { checkUserExists, createUser } from '~/composables/users'
import { userCreateSchema } from '~/dtos/users'

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readValidatedBody(event, userCreateSchema.omit({
    id: true,
    userId: true,
  }).parse)

  if (await checkUserExists(email))
    throw throwBadRequest('邮箱已注册！')

  return createUser({ name, email, password })
})
