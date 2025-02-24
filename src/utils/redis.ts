/**
 * 获取 redis 实例
 * @returns redis 实例
 */
export function useRedis() {
  return useStorage('redis')
}

/**
 * 获取 redis 缓存
 * @param key 缓存 key
 * @returns 缓存 value
 */
export function getRedisItem(key: string) {
  return useRedis().getItem(key)
}

/**
 * 设置 redis 缓存
 * @param key 缓存 key
 * @param value 缓存 value
 * @param ttl 缓存过期时间, 默认持久化
 */
export function setRedisItem(key: string, value: any, ttl: number = -1) {
  return useRedis().setItem(key, value, { ttl })
}

/**
 * 删除 redis 缓存
 * @param key 缓存 key
 */
export function removeRedisItem(key: string) {
  return useRedis().removeItem(key)
}

/**
 * 清空 redis 缓存
 */
export function clearRedis() {
  return useRedis().clear()
}
