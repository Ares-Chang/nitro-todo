import { updateTodo } from '~/composables/todos'
import { todosIdSchema, todosUpdateSchema } from '~/dtos/todos'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, todosIdSchema.parse)
  const { title, content, dueTime, groupId } = await readValidatedBody(event, todosUpdateSchema.parse)

  await updateTodo(id, { title, content, dueTime, groupId })
})
