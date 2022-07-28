import Taro from "@tarojs/taro";


/**
 * 设置 系统 本地存储
 * @param {Object} systemInfo 
 */
export const setSystem = (systemInfo) => {
  Taro.setStorageSync('system', JSON.stringify(systemInfo))
}

/**
 * 返回 系统 本地存储
 */
export const getSystem = () => {
  const result = Taro.getStorageSync('system')
  return result ? JSON.parse(result) : null
}

/**
 * 设置 小程序 本地存储
 * @param {Object} systemInfo 
 */
export const setAccountInfo = (systemInfo) => {
  Taro.setStorageSync('accountInfo', JSON.stringify(systemInfo))
}

/**
 * 返回 系统 本地存储
 */
export const getAccountInfo = () => {
  const result = Taro.getStorageSync('accountInfo')
  return result ? JSON.parse(result) : null
}

/**
 *  设置 参数本地存储
 * @param {Object} info 
 */
export const setParam = (info:Object) => {
  Taro.setStorageSync('params', JSON.stringify(info))
}

/**
 * 返回 参数本地存储
 */
export const getParam = () => {
  const res = Taro.getStorageSync('params') || null
  return res?JSON.parse(res):null
}
