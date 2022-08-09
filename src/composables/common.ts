import { useEffect, useState } from 'react'

export const useMount = (callback: Function) => {
  // 空数组表示该 effect 只执行一次
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
// 防抖 hooks 写法: 跟普通的防抖函数不同的是，这个防抖是变量改变的防抖
export const useDebounce = (value: any, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [value, delay])
  return debounceValue
}
