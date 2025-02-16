import { index, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { TimeStamp } from '../share'

export const groupsTable = mysqlTable(
  'groups',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    ...TimeStamp,
  },
  // 添加索引优化查询
  t => ([
    index('name_idx').on(t.name),
    index('deleted_idx').on(t.deletedAt),
  ]),
)
