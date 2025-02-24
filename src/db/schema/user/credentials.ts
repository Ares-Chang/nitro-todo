import { index, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { TimeStamp } from '../../share'
import { userProfiles } from './profiles'

const { createdAt, updatedAt } = TimeStamp

export const userCredentials = mysqlTable('user_credentials', {
  // userId 关联 user_profiles 表
  userId: varchar('user_id', { length: 21 })
    .primaryKey()
    .notNull()
    .references(() => userProfiles.id, {
      onDelete: 'cascade',
    }),
  /** 邮箱 */
  email: varchar('email', { length: 255 }).notNull(),
  /** 密码 */
  password: varchar('password', { length: 255 }).notNull(),

  createdAt,
  updatedAt,
}, table => ([
  index('userIdIdx').on(table.userId),
]))
