import { verificationSchema } from '~/dtos/verifications'

export default defineEventHandler(async (event) => {
  const { email, type } = await readValidatedBody(event, verificationSchema.parse)

  const key = getRedisVerificationKey(email, type)

  if (await getRedisItem(key))
    throw throwBadRequest('验证码已发送！')

  const code = generateCode()

  setRedisItem(key, code, 60 * 10)

  sendEmail(email, '验证码', `<p>您的验证码是: <strong>${code}</strong>. 它将在10分钟后过期。</p>`)

  return {
    data: '发送成功',
  }
})
