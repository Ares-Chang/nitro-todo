import { drizzle } from 'drizzle-orm/mysql2'

const config = useRuntimeConfig()

export const db = drizzle({
  connection: {
    ...config.db,
    port: Number(config.db.port),
  },
})
