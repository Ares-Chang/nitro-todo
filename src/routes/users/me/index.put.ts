import { updateUser } from '~/composables/users'
import { userUpdateSchema } from '~/dtos/users'

export default defineEventHandler(async (event) => {
  const { name, avatar, bio } = await readValidatedBody(event, userUpdateSchema.parse)

  const user = useUser(event)

  await updateUser(user.userCredentials.userId, {
    name,
    avatar,
    bio,
  })

  return {
    message: '更新用户信息成功',
  }
})
