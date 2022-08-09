/**
 * 防抖
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export const debounce = (fn: (...args: any[]) => void, wait: number, immediate: boolean) => {
  let timer: number | null
  let now = 0
  let context: any
  let argms: any[]

  const run = (timerInterval: number) => {
    timer = window.setTimeout(() => {
      const interval = Date.now() - now
      if (interval < timerInterval) {
        now = +new Date()
        run(timerInterval)
      } else {
        if (!immediate) {
          fn.apply(context, argms)
        }
        clearTimeout(timer as number)
        timer = null
      }
    }, timerInterval)
  }

  return function (...args: any[]) {
    context = this
    argms = args
    now = +new Date()
    if (!timer) {
      if (immediate) {
        fn.apply(context, argms)
      }
      run(wait)
    }
  }
}

/**
 * 节流
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export const throttle = (fn: (...args: any[]) => any, delay: number) => {
  let pre = 0
  return (...params: any[]) => {
    let now = new Date().getTime()
    if (now - pre > delay) {
      fn(...params)
      pre = now
    }
  }
}

/**
 * 批量过滤对象值为空的属性
 * @param {Object} val 需要过滤的对象
 * @param {Array}  arr 排除过滤的属性
 * @returns
 */
export const getFilterData = (val: Record<string, any> = {}, arr: string[] = []) => {
  let res: Record<string, any> = {}
  for (let key in val) {
    if (val[key] !== undefined && val[key] !== null && val[key] !== '' && !arr.includes(key)) {
      if (typeof val[key] == 'number') {
        if (!Number.isNaN(val[key])) {
          res[key] = val[key]
        }
      } else {
        res[key] = val[key]
      }
    }
  }
  return res
}
type CopyObjectParams = Record<string, any> | Array<any>
/**
 * 对象深拷贝
 * @param {*} object
 * @returns
 */
export const copyObject = (object: CopyObjectParams): CopyObjectParams => {
  if (Object.prototype.toString.call(object) === '[object Object]') {
    let keys = Object.keys(object)
    let newObject: Record<string, any> = {}
    keys.map(key => {
      newObject[key] = copyObject((object as Record<string, any>)[key])
    })
    return newObject as Record<string, any>
  } else if (object.constructor == Array) {
    return object.map((item: any) => {
      return copyObject(item)
    }) as Array<any>
  } else {
    return object as any
  }
}

/**
 * 
 * @param {*} suffix 
 * !w80
    !w100
    !w160
    !w200
    !w400
    !w800
    !wh400
    !w600
 */
export const screenshot = (url: string, suffix = '!w200') => {
  return url + suffix
}
