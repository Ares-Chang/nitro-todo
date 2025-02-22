export enum HttpStatus {
  /** 成功 */
  OK = 200,
  /** 请求错误 */
  BAD_REQUEST = 400,
  /** 未授权 */
  UNAUTHORIZED = 401,
  /** 禁止访问 */
  FORBIDDEN = 403,
  /** 未找到 */
  NOT_FOUND = 404,
  /** 服务器错误 */
  INTERNAL_SERVER_ERROR = 500,
}

type CreateErrorOptions = Exclude<Parameters<typeof createError>[0], string>

/**
 * 抛出错误
 * @param message 错误消息
 * @param code 错误码
 * @param args 其他参数
 */
export function throwError(message: string, code = HttpStatus.BAD_REQUEST, args: CreateErrorOptions = {}) {
  throw createError({
    statusCode: code,
    message,
    ...args,
  })
}

/**
 * 抛出 400 错误
 * @param message 错误消息
 * @param args 其他参数
 */
export function throwBadRequest(message: string, args: CreateErrorOptions = {}) {
  throwError(message, HttpStatus.BAD_REQUEST, {
    statusMessage: 'bad request',
    ...args,
  })
}

/**
 * 抛出 401 错误
 * @param message 错误消息
 * @param args 其他参数
 */
export function throwUnauthorized(message: string, args: CreateErrorOptions = {}) {
  throwError(message, HttpStatus.UNAUTHORIZED, {
    statusMessage: 'unauthorized',
    ...args,
  })
}

/**
 * 抛出 403 错误
 * @param message 错误消息
 * @param args 其他参数
 */
export function throwForbidden(message: string, args: CreateErrorOptions = {}) {
  throwError(message, HttpStatus.FORBIDDEN, {
    statusMessage: 'forbidden',
    ...args,
  })
}

/**
 * 抛出 404 错误
 * @param message 错误消息
 * @param args 其他参数
 */
export function throwNotFound(message: string, args: CreateErrorOptions = {}) {
  throwError(message, HttpStatus.NOT_FOUND, {
    statusMessage: 'not found',
    ...args,
  })
}

/**
 * 抛出 500 错误
 * @param message 错误消息
 * @param args 其他参数
 */
export function throwInternalServerError(message: string, args: CreateErrorOptions = {}) {
  throwError(message, HttpStatus.INTERNAL_SERVER_ERROR, {
    statusMessage: 'internal server error',
    ...args,
  })
}
