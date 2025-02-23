import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { todos } from '~/db/schema/todos'

const todosStatus = ['active', 'completed'] as const

export type CreateTodo = typeof todos.$inferInsert
export const todosCreateSchema = createInsertSchema(todos, {
  title: schema => schema.nonempty('标题不能为空'),
  dueTime: z.coerce.date().optional(),
})

export type TodosSelect = z.infer<typeof todosSelectSchema>
export const todosSelectSchema = z.object({
  groupId: z.number({ coerce: true }).optional(),
  status: z.enum(['all', ...todosStatus]).optional().default('all'),
  sort: z.enum(['createdAt', 'dueTime']).optional().default('createdAt'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
})

export type TodosUpdate = z.infer<typeof todosUpdateSchema>
export const todosUpdateSchema = todosCreateSchema.partial()

export const todosIdSchema = z.object({
  id: z.coerce.number(),
})

export const todosStatusSchema = z.object({
  status: z.enum(todosStatus),
})
