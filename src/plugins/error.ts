export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', (error, { event }) => {
    if (event && event.node.res.statusCode !== 404) {
      setResponseHeader(event, 'Content-Type', 'application/json')

      return send(event, JSON.stringify({
        code: event.node.res.statusCode,
        message: error.message,
      }))
    }
  })
})
