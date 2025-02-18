import { z } from 'zod'

export const groupsCreateSchema = z.object({
  name: z.string().min(1, { message: '名称不能为空' }),
}, {
  required_error: '参数格式不正确',
})
