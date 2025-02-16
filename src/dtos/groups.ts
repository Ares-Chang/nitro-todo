import { z } from 'zod'

export const groupsCreateSchema = z.object({
  name: z.string({ required_error: '名称不能为空', invalid_type_error: '名称必须为字符串' }).min(1),
})
