import { z } from 'zod'

export const uploadSchema = z.object({
  file: z.instanceof(File, { message: '文件格式错误' })
    .refine(
      file => ['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(file.type),
      { message: '文件类型错误' },
    )
    .refine(file => file.size <= 5 * 1024 * 1024, { message: '文件大小超过 5MB' }),
})
