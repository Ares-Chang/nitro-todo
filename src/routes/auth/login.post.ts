import { getUser } from '~/composables/users'
import { loginSchema } from '~/dtos/auth'

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, loginSchema.parse)

  const user = await getUser(email)

  if (!user)
    throw throwBadRequest('用户不存在')

  const isPasswordMatch = await verifyPassword(password, user.userCredentials.password)

  if (!isPasswordMatch)
    throw throwBadRequest('密码错误')

  const token = signToken({ id: user.userCredentials.userId, name: user.userProfiles.name })

  return {
    data: token,
    message: '登录成功',
  }
})
