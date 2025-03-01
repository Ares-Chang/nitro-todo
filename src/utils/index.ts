import process from 'node:process'

/**
 * 判断是否为开发环境
 */
export const isDev = process.env.NODE_ENV === 'development'
