import Taro from '@tarojs/taro'
import Qs from 'qs'

/**
 * 跳转
 * @param path
 * @param params
 * @param type false 跳转普通页面，true 跳转tabbar页面
 */
type ParamLink = 'navigateTo' | 'switchTab' | 'reLaunch' | 'redirectTo'
export const goLink = (path = '', params = {}, way: ParamLink = 'navigateTo') => {
  if (path) {
    let params_str = Qs.stringify(params)
    console.log('params_str::', params_str)
    path = params_str ? path + '?' + params_str : path
    console.log('path::', way)
    Taro[way]({ url: path })
  }
}
/**
 * 判断对象为空
 * @param object
 * @returns
 */
export const isEmptyObject = (object: any) => {
  if (object == undefined || object == null || Number.isNaN(object)) {
    return true
  } else {
    if (object.constructor == Object) {
      return Reflect.ownKeys(object).length == 0
    } else if (object.constructor == Array) {
      return object.length == 0
    } else if (object.constructor == String) {
      return object == ''
    }
  }
  return false
}

/**
 *  表单检索
 * @param data 
 * @param rules = {
    account: [{
      message: "请输入正确的用户名",
      // regex: /\d/, // 正则匹配规则
      // validator: (value:any, rule:any)=>{ // 自定义验证，返回true表示匹配到了(错误)
      //   return false;
      // }
    }],
    password: [{
      message: "请输入正确的密码",
      // regex: /\d/
    }]
  };
 * @param message 
 * @returns 
 */
export const retrieval = (data: any, rules?: Object, message: string = '请填写完信息') => {
  return new Promise((resolve, reject) => {
    if (rules) {
      const keys = Reflect.ownKeys(rules)
      const result = keys.some((key: any) => {
        for (let item of (rules as any)[key]) {
          let _res = false
          if (item.validator) {
            if (item.validator(data[key], item)) {
              _res = true
            }
          } else if (item.regex) {
            if (!item.regex.test(data[key])) {
              _res = true
            }
          } else {
            if (isEmptyObject(data[key])) {
              _res = true
            }
          }
          message = item.message
          return _res
        }
      })
      if (result) {
        reject(message)
      }
    } else {
      const keys = Reflect.ownKeys(data)
      if (keys.some((key: any) => isEmptyObject(data[key]))) {
        reject(message)
      }
    }
    resolve(null)
  })
}
/**
 * toast提示
 */
export const alert = {
  success(title: string) {
    Taro.showToast({
      title,
      icon: 'success'
    })
  },
  error(title: string) {
    Taro.showToast({
      title,
      icon: 'error'
    })
  },
  loading(title: string) {
    Taro.showToast({
      title,
      icon: 'loading'
    })
  },
  none(title: string) {
    Taro.showToast({
      title,
      icon: 'none'
    })
  }
}

// 金额千位分割符
export const formatKbPrice = (number: string) => {
  const ret = Array.from(number)
    .reverse()
    .reduce((result: string[], next, i, arr) => {
      if ((i + 1) % 3 === 0 && i + 1 !== arr.length) {
        result.push(next, ',')
        return result
      }
      result.push(next)
      return result
    }, [])
  return ret.reverse().join('')
}
