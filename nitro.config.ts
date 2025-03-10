import process from 'node:process'

const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
}

const redis = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
}

// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'src',
  compatibilityDate: '2025-02-13',
  experimental: {
    database: true,
    openAPI: true,
  },

  openAPI: {
    meta: {
      title: 'TODO API',
      description: 'Nitro TODO API',
      version: '1.0.0',
    },
  },

  storage: {
    redis: {
      driver: 'redis',
      host: redis.host,
      port: redis.port,
      password: redis.password,
    },
  },

  database: {
    default: {
      connector: 'mysql2',
      options: db,
    },
  },

  runtimeConfig: {
    db,
    email: {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    JWT_SECRET: '',
    uploadDir: './src/public/uploads',
  },
})
