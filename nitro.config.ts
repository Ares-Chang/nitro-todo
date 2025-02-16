import process from 'node:process'

// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'src',
  compatibilityDate: '2025-02-13',
  experimental: {
    database: true,
  },

  database: {
    default: {
      connector: 'mysql2',
      options: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      },
    },
  },
})
