import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { z } from 'zod'
import { groups } from '~/db/schema/groups'

export const groupsSelectSchema = z.object({
  id: z.coerce.number({ message: 'id 格式不正确' }).int().nonnegative(),
})

export const groupsCreateSchema = createInsertSchema(groups, {
  name: schema => schema.nonempty('名称不能为空'),
})

export const groupsUpdateSchema = createUpdateSchema(groups, {
  name: schema => schema.nonempty('名称不能为空'),
})
