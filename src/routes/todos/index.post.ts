import { createTodo } from '~/composables/todos'
import { todosCreateSchema } from '~/dtos/todos'

export default defineEventHandler(async (event) => {
  const { title, content, groupId, dueTime } = await readValidatedBody(event, todosCreateSchema.parse)

  await createTodo({ title, content, groupId, dueTime })
})
