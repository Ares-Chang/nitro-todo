export default defineEventHandler(async (event) => {
  const user = useUser(event)

  return {
    id: user.userCredentials.userId,
    name: user.userProfiles.name,
    email: user.userCredentials.email,
    avatar: user.userProfiles.avatar,
    bio: user.userProfiles.bio,
    createdAt: user.userCredentials.createdAt,
    updatedAt: user.userCredentials.updatedAt,
  }
})
