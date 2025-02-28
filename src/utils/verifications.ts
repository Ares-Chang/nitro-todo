/**
 * 生成指定长度的验证码（支持自定义字符集）
 * @param length - 验证码的长度
 * @param charset - 自定义字符集，默认为纯数字
 * @returns 返回生成的验证码字符串
 */
export function generateCode(length: number = 6, charset: string = '0123456789') {
  let code = ''
  const charsetLength = charset.length

  for (let i = 0; i < length; i++) {
    // 从字符集中随机选择一个字符
    const randomIndex = Math.floor(Math.random() * charsetLength)
    code += charset[randomIndex]
  }
  return code
}
