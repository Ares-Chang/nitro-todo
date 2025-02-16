import { timestamp } from 'drizzle-orm/mysql-core'

export const TimeStamp = {
  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .onUpdateNow()
    .notNull(),
  deletedAt: timestamp('deleted_at'),
}
