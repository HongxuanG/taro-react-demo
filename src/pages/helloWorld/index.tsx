import A from '@/components/A'
import { useDebounce } from '@/composables/common'
import { View, Input, Button, InputProps, CommonEventFunction } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect, useRef, useState } from 'react'
import { AContext, defaultAValue } from './context'
import styles from './index.module.scss'

const HelloWorld: React.FC = () => {
  const [count, setCount] = useState(5)
  const [count2, setCount2] = useState(6)
  const handleCount = () => {
    setCount(count)
  }

  const handleNavite = () => {
    Taro.redirectTo({
      url: '/pages/history/index'
    })
  }

  const [effect, setEffect] = useState('')
  // 每一次渲染后都会执行：运行effect的时候，都保证已经DOM更新完毕
  // useEffect(() => {
  //   console.log('useEffect triggered', count)
  //   // setEffect('useEffect triggered'+count)
  //   return () => {
  //     //  React 会在组件卸载的时候执行清除操作
  //     console.log('useEffect cleanup', count)
  //   }
  //   // 第二个参数作为数组，可以实现性能优化，count不变的时候可以跳过执行effect
  // }, [count])

  // 以下effect会报错，因为useEffect不能在条件中使用
  // if (count % 2 === 0) {
  //   useEffect(() => {
  //     console.log('useEffect triggered', count)
  //     // setEffect('useEffect triggered'+count)
  //     return () => {
  //       //  React 会在组件卸载的时候执行清除操作
  //       console.log('useEffect cleanup', count)
  //     }
  //     // 第二个参数作为数组，可以实现性能优化，count不变的时候可以跳过执行effect
  //   }, [count])
  // }

  const debounceCount = useDebounce(count, 2000)
  useEffect(() => {
    console.log('setCount', debounceCount)
  }, [debounceCount])

  const inputRef = useRef()

  const handleSubmit = () => {
    console.log(inputRef.current)
  }

  const handleInput = (event: any) => {
    console.log(event.detail.value)
    setCount(Number(event.detail.value))
  }

  const handleCountPlus = () => {
    setCount(count + 1)
  }
  const handleCountSub = () => {
    setCount(count - 1)
  }

  const [total, setTotal] = useState(() => {
    return count + count2
  })

  useEffect(() => {
    setTotal(() => {
      return count + count2
    })
  }, [total, count, count2])
  return (
    <View>
      <View>count: {count}</View>
      <View>count2: {count2}</View>
      <View>total: {total}</View>
      <View>effect: {effect}</View>
      <View>
        <Button size='mini' onClick={handleCountPlus}>
          count1 + 1
        </Button>
        <Button size='mini' onClick={handleCountSub}>
          count1 - 1
        </Button>
      </View>
      <View>
        <Button size='mini' onClick={() => setCount2(count2 + 1)}>
          count2 + 1
        </Button>
        <Button size='mini' onClick={() => setCount2(count2 - 1)}>
          count2 - 1
        </Button>
      </View>
      <Input
        ref={inputRef}
        type='text'
        className={styles['input-class']}
        placeholder='测试防抖hooks'
        onInput={handleInput}
      ></Input>
      <Button onClick={handleSubmit}>提交</Button>
      <Button onClick={handleNavite}>跳转到history</Button>
      <AContext.Provider value={defaultAValue}>
        <A></A>
      </AContext.Provider>
    </View>
  )
}
export default HelloWorld

// export const mount = ()  => {
//   useEffect(()=>{

//   }, [])
// }
