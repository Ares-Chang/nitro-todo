import { timestamp } from 'drizzle-orm/mysql-core'

export const TimeStamp = {
  /** 创建时间 */
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
  /** 更新时间 */
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .onUpdateNow()
    .notNull(),
  /** 删除时间 */
  deletedAt: timestamp('deleted_at'),
}
