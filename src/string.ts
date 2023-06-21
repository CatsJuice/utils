import { randomInt } from './math'

/**
 * 驼峰命名 转 横杠拼接
 * @param str
 * @return {string} 横杠拼接的字符串
 */
export function camel2Dash(
  /** 要转换的命名 */
  str: string,
): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

/**
 * 横杠拼接 转 驼峰命名
 * @return {string} 驼峰命名的字符串（首字母是否大写取决于 `upperFirst` 参数）
 */
export function dashToCamel(
  /** 要转换的字符串 */
  str: string,

  /** 是否将首字母转为大写 */
  upperFirst?: boolean,
): string {
  const res = str.replace(/-([a-z])/g, (_m, w) => w.toUpperCase())
  return (upperFirst ? res[0]?.toUpperCase() : res[0]?.toLowerCase()) + res.slice(1)
}

/**
 * 生成随机密码
 * @param min
 * @param max
 * @param special
 * @return {string} 随机密码
 */
export function randomString(
  /** 最小长度 */
  min = 8,
  /** 最大长度 */
  max = 16,
  /** 允许的特殊字符 */
  special = '!@#$%^&*()-_=+,.:;?/~',
) {
  const length = randomInt(min, max)
  const num = '0123456789'
  const chars = 'abcdefghijklmnopqrstuvwxyz'

  const specialNum = special ? randomInt(1, 4) : 0
  const upperCharNum = randomInt(1, (length - specialNum) / 2)
  const numNum = randomInt(1, (length - specialNum - upperCharNum) / 2)
  const rest = length - specialNum - upperCharNum - numNum
  let resStr = ''
  const randomC = (dict: string) => dict[randomInt(0, dict.length - 1)]
  for (let i = 0; i < specialNum; i++) resStr += randomC(special)
  for (let i = 0; i < upperCharNum; i++)
    resStr += randomC(chars.toUpperCase())
  for (let i = 0; i < numNum; i++) resStr += randomC(num)
  for (let i = 0; i < rest; i++) resStr += randomC(chars)

  resStr = resStr
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')
  return resStr
}
