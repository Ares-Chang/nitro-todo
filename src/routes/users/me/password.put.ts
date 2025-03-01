import { updateUserPassword } from '~/composables/users'
import { userUpdatePasswordSchema } from '~/dtos/users'

export default defineEventHandler(async (event) => {
  const { password, newPassword, code } = await readValidatedBody(event, userUpdatePasswordSchema.parse)

  const user = useUser(event)

  if (!await verifyPassword(password, user.userCredentials.password))
    throw throwBadRequest('旧密码错误')

  const hashedPassword = await hashPassword(newPassword)

  if (password === newPassword)
    throw throwBadRequest('新密码不能与旧密码相同')

  const key = getRedisVerificationKey(user.userCredentials.email, 'resetPassword')

  const redisCode = await getRedisItem(key)

  if (Number(redisCode) !== Number(code))
    throw throwBadRequest('验证码错误！')

  await updateUserPassword(user.userCredentials.userId, hashedPassword)

  await removeRedisItem(key)

  return {
    message: '密码更新成功',
  }
})
