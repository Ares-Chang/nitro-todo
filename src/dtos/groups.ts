import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { groups } from '~/db/schema/groups'

export const groupsCreateSchema = createInsertSchema(groups, {
  name: schema => schema.nonempty('名称不能为空'),
})

export const groupsUpdateSchema = createUpdateSchema(groups, {
  name: schema => schema.nonempty('名称不能为空'),
})
