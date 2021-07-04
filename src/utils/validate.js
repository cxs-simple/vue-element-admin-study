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
