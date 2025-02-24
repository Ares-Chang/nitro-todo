import { index, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'
import { TimeStamp } from '../../share'

const { createdAt, updatedAt } = TimeStamp

export const userProfiles = mysqlTable('user_profiles', {
  /** 用户 id */
  id: varchar('id', { length: 21 }).primaryKey().notNull(),
  /** 用户名 */
  name: varchar('name', { length: 255 }).notNull(),
  /** 头像 */
  avatar: varchar('avatar', { length: 255 }),
  /** 简介 */
  bio: text('bio'),

  createdAt,
  updatedAt,
}, table => ([
  index('id_idx').on(table.id),
]))
