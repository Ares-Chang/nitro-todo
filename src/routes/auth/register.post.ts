import { checkUserExists, createUser } from '~/composables/users'
import { userCreateSchema } from '~/dtos/users'

export default defineEventHandler(async (event) => {
  const { name, email, password, code } = await readValidatedBody(event, userCreateSchema.omit({
    id: true,
    userId: true,
  }).parse)

  if (await checkUserExists(email))
    throw throwBadRequest('邮箱已注册！')

  const key = getRedisVerificationKey(email, 'register')

  const redisCode = await getRedisItem(key)

  if (Number(redisCode) !== Number(code))
    throw throwBadRequest('验证码错误！')

  const hashedPassword = await hashPassword(password)

  await createUser({ name, email, password: hashedPassword })

  await removeRedisItem(key)

  return {
    data: '注册成功',
  }
})
