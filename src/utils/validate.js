/**
 * 共通校验
 */

/**
 * 用户名校验
 * @param {String} str 
 * @returns {Boolean}
 */
export function validUsername(str) {
  const user_map = ['admin', 'cuixinshu', 'suping']
  return user_map.indexOf(str.trim()) >= 0
}

/**
 * 外部链接校验
 * @param {*} path 
 * @returns {Boolean}
 */
export function isExternal(path) {
  // mailto: 邮箱超链接
  // tel: 电话超链接
  return /^(https?:|mailto:|tel:)/.test(path)
}
