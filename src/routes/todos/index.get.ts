import { getTodos } from '~/composables/todos'
import { todosSelectSchema } from '~/dtos/todos'

export default defineEventHandler(async (event) => {
  const { groupId, status, sort, order } = await getValidatedQuery(event, todosSelectSchema.parse)

  return getTodos({ groupId, status, sort, order })
})
