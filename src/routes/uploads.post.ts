import { Buffer } from 'node:buffer'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { uploadSchema } from '~/dtos/uploads'

defineRouteMeta({
  openAPI: {
    summary: '上传文件',
    description: '上传文件',
    tags: ['文件上传'],
    security: [{
      bearerAuth: [],
    }],
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: { type: 'string', format: 'binary' },
            },
            required: ['file'],
          },
        },
      },
    },
    responses: {
      200: {
        description: '上传成功',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                data: {
                  type: 'object',
                  properties: {
                    url: { type: 'string', example: '/uploads/123.jpg' },
                  },
                },
                message: { type: 'string', example: '上传成功' },
              },
            },
          },
        },
      },
      500: {
        description: '上传失败',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                code: { type: 'number', example: 500 },
                message: { type: 'string', example: '文件保存失败' },
              },
            },
          },
        },
      },
    },
  },
})

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)

  const file = formData.get('file') as File

  const { success, error } = uploadSchema.safeParse({ file })

  if (!success)
    throw throwBadRequest(error?.errors[0].message)

  const fileName = `${Date.now()}-${file.name}`

  const { uploadDir } = useRuntimeConfig(event)
  const filePath = path.join(process.cwd(), uploadDir, fileName)

  // 保存文件
  try {
    const buffer = await file.arrayBuffer()

    // 确保目录存在
    await mkdir(path.dirname(filePath), { recursive: true })
    await writeFile(filePath, Buffer.from(buffer))

    return {
      data: {
        url: `/uploads/${fileName}`,
      },
      message: '上传成功',
    }
  }
  catch (error) {
    console.error(error)
    throw throwInternalServerError('文件保存失败')
  }
})
