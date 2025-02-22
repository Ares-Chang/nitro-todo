import type { H3Error } from 'h3'
import process from 'node:process'
import { ZodError } from 'zod'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', (error, { event }) => {
    if (event && event.node.res.statusCode !== 404) {
      setResponseHeader(event, 'Content-Type', 'application/json')

      const { cause, statusMessage, stack } = error as H3Error

      const isZodError = (cause as { data: unknown }).data instanceof ZodError

      let message = error.message
      if (isZodError) {
        const data = JSON.parse(error.message)
        message = data[0].message
      }

      return send(event, JSON.stringify({
        code: event.node.res.statusCode,
        message,
        statusMessage,
        stack: process.env.NODE_ENV === 'development' ? stack : undefined,
      }))
    }
  })
})
