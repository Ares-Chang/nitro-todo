import { createInsertSchema } from 'drizzle-zod'
import { groups } from '~/db/schema/groups'

export const groupsCreateSchema = createInsertSchema(groups, {
  name: schema => schema.nonempty('名称不能为空'),
})
