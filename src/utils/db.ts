import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '~/db/schema'

const config = useRuntimeConfig()

const pool = mysql.createPool({
  ...config.db,
  port: Number(config.db.port),
})

export const db = drizzle({
  client: pool,
  schema,
  mode: 'default',
})
