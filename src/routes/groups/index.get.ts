import { getGroups } from '~/composables/groups'

export default defineEventHandler(() => {
  try {
    return getGroups()
  }
  catch {
    throw throwBadRequest('获取失败')
  }
})
