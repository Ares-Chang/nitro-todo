import { usersTable } from '~/db/schema'

export default defineEventHandler(async () => {
  const users = await db.select().from(usersTable)
  return users
})
