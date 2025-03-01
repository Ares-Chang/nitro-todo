import { getUser } from '~/composables/users'

// 白名单
const whiteList = ['/auth/login', '/auth/register', '/auth/refresh']

export default defineEventHandler(async (event) => {
  if (!whiteList.includes(event.path)) {
    const token = getHeader(event, 'Authorization')

    if (!token)
      throw throwUnauthorized('请先登录')

    const decoded = verifyToken(token)

    const user = await getUser(decoded.id)

    if (!user)
      throw throwUnauthorized('用户不存在')

    event.context.user = user
  }
})
