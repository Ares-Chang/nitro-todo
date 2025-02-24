import { createTransport } from 'nodemailer'

function initEmail() {
  const { host, port, user, pass } = useRuntimeConfig().email
  return createTransport({
    host,
    port,
    auth: {
      user,
      pass,
    },
    logger: true,
  })
}

/**
 * 发送邮件
 * @param to 收件人
 * @param subject 主题
 * @param html 内容
 */
export function sendEmail(to: string, subject: string, html: string) {
  const { user } = useRuntimeConfig().email

  const transporter = initEmail()

  return transporter.sendMail({
    from: user,
    to,
    subject,
    html,
  })
}
