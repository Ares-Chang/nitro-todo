export default defineEventHandler(async (event) => {
  const user = useUser(event)

  const key = getRedisRefreshTokenKey(user.userCredentials.userId)
  await removeRedisItem(key)

  return {
    message: '退出成功',
  }
})
