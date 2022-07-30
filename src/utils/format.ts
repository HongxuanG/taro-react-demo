import { IMG_CND_Prefix } from './constant'

/**
 * 移除井号
 * @param {String} val code 编码
 * @returns
 */
export const formatRemoveHashTag = (val = '') => {
  // console.log('移除标签',val,val.endsWith("#"));
  return val.endsWith('#') ? val.replace('#', '') : val
}

/**
 * 格式化编码+名称显示方式
 * @param {String} code 编码
 * @param {String} name 名称
 * @param {*} mode 模式 both:code + 名称 name: 仅显示名称
 * @returns
 */
export const formatHashTag = (code = '', name = '', mode = 'both') => {
  if (mode == 'both') {
    return `${formatRemoveHashTag(code)}# ${name}`
  } else if (mode == 'name') {
    return `${name}`
  }
}

const Digit = 10 * 10

/**
 * 重量 进退位 单位
 */
export const weightDigit = 1000

/**
 * 除以
 * @param {*} val
 * @param {*} digit
 * @returns
 */
export const formatPriceDiv = (val, digit = Digit) => {
  return strip(Number(val / digit)) || 0
}
/**
 * 乘以
 * @param {*} val
 * @param {*} digit
 * @returns
 */
export const formatPriceMul = (val, digit = Digit) => {
  return strip(Number(val * digit)) || 0
}

/**
 * 格式化重量单位 (乘以)
 * @param {Number} val
 * @returns
 */
export const formatWeightMul = (val, digit = weightDigit) => {
  return strip(Number(val * digit)) || 0
}

/**
 * 格式化重量单位 (除以)
 * @param {*} val
 */
export const formatWeightDiv = (val, digit = weightDigit) => {
  return strip(Number(val / digit)) || 0
}

export const formatDateTime = (val, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  if (val) {
    let time = new Date(val)
    let Y = time.getFullYear()
    let M = time.getMonth() + 1
    let d = time.getDate()
    let h = time.getHours()
    let m = time.getMinutes()
    let s = time.getSeconds()

    fmt = fmt
      .replace('YYYY', String(Y))
      .replace('MM', M.toString().padStart(2, '0'))
      .replace('DD', d.toString().padStart(2, '0'))
      .replace('HH', h.toString().padStart(2, '0'))
      .replace('mm', m.toString().padStart(2, '0'))
      .replace('ss', s.toString().padStart(2, '0'))
    // fmt = fmt.replace('MM', M)
    // fmt = fmt.replace('DD', d)
    // fmt = fmt.replace('HH', h)
    // fmt = fmt.replace('mm', m)
    // fmt = fmt.replace('ss', s)

    return fmt
  } else {
    return val
  }
}

/**
 *  精度
 * @param {*} num
 * @param {*} precision
 * @returns
 */
export const strip = (num, precision = 12) => {
  return +parseFloat(num.toPrecision(precision))
}

/**
 * 转换金额单位
 * @param {*} num 金额 / 数值
 * @param {*} digit 转换单位
 * @returns
 */
export const formatMillionYuan = (num, digit = 10000) => {
  return num / digit > 1 ? { num: toDecimal2(num / digit), million: true } : { num, million: false }
}

/**
 * 数值保留两位小数
 * @param {*} x
 * @returns
 */
export const toDecimal2 = x => {
  var f = parseFloat(x)
  if (Number.isNaN(f)) {
    return 0
  }
  let stringifyF = String(f)
  let index = stringifyF.lastIndexOf('.')
  if (index >= 0) {
    let decimal = stringifyF.substring(index + 1)
    if (decimal.length == 1) {
      stringifyF = stringifyF.substring(0, index + 1) + decimal + '0'
    } else {
      stringifyF = stringifyF.substring(0, index + 1) + decimal.substring(0, 2)
    }
  }
  return stringifyF
}

/**
 * 格式化图片路径
 * @param {*} url
 * @status true|false
 * @returns
 */
export const formatImgUrl = (url, suffix = '!w200') => {
  return url ? IMG_CND_Prefix + url + suffix : IMG_CND_Prefix + '/mall/no_img.png'
}

/**
 *
 * @param {纹理图} imgurl
 * @param {rgb} rgb
 * @param {} suffix
 * @returns 1 有纹理图，2 有rgb 3默认图
 */
export const isLabImage = (imgurl, rgb, suffix = '!w200') => {
  if (imgurl) {
    return { status: 1, value: IMG_CND_Prefix + '/' + imgurl + suffix }
  } else if (rgb.r != 0 || rgb.g != 0 || rgb.b != 0) {
    return { status: 2, value: rgb }
  } else {
    return { status: 3, value: IMG_CND_Prefix + '/mall/no_img.png' }
  }
}
