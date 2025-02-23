import { deleteTodo } from '~/composables/todos'
import { todosIdSchema } from '~/dtos/todos'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, todosIdSchema.parse)

  await deleteTodo(id)
})
