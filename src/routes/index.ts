defineRouteMeta({
  openAPI: {
    summary: 'Hello World',
    description: 'Hello World',
    tags: ['Hello World'],
  },
})

export default defineEventHandler(() => {
  return 'Hello World!'
})
