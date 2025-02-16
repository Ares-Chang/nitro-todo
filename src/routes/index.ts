export default defineEventHandler(async () => {
  const db = useDatabase()
  const res = await db.sql`SELECT 1 + 1 AS solution`
  return res
})
