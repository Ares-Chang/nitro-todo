import { Buffer } from 'node:buffer'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { uploadSchema } from '~/dtos/uploads'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)

  const file = formData.get('file') as File

  const { success, error } = uploadSchema.safeParse({ file })

  if (!success)
    throw throwBadRequest(error?.errors[0].message)

  const fileName = `${Date.now()}-${file.name}`
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName)

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
