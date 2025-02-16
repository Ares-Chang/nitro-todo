import { index, int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { TimeStamp } from '../share'
import { groups } from './groups'

export const todos = mysqlTable(
  'todos',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content'),
    dueTime: timestamp('due_time'),
    groupId: int('group_id')
      .notNull()
      .references(() => groups.id, {
        // 关键配置：级联删除
        onDelete: 'cascade',
      }),
    ...TimeStamp,
  },
  // 添加索引优化查询
  t => ([
    index('title_idx').on(t.title),
    index('group_idx').on(t.groupId),
    index('due_time_idx').on(t.dueTime),
  ]),
)
