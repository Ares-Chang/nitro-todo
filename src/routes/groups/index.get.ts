import { getGroups } from '~/composables/groups'

export default defineEventHandler(() => {
  return getGroups()
})
