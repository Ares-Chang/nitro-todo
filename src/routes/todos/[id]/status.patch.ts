import { updateTodoStatus } from '~/composables/todos'
import { todosIdSchema, todosStatusSchema } from '~/dtos/todos'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, todosIdSchema.parse)
  const { status } = await readValidatedBody(event, todosStatusSchema.parse)

  await updateTodoStatus(id, status)
})
