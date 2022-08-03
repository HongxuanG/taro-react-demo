import { View, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'

const HelloWorld = () => {
  const [count, setCount] = useState(0)
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
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1)
      console.log('setCount')
    }, 1000)
    return () => {
      console.log('clearInterval')
      clearInterval(id)
    }
  }, [])

  const inputRef = React.createRef()

  const handleSubmit = () => {
    console.log(inputRef.current)
  }


  return (
    <View>
      <View>count: {count}</View>
      <View>effect: {effect}</View>
      <Button size="mini" onClick={handleCount}>
        更新count
      </Button>
      <Input ref={inputRef} type="text" ></Input>
      <Button onClick={handleSubmit}>提交</Button>
      <Button onClick={handleNavite}>跳转到history</Button>
    </View>
  )
}
export default HelloWorld

// export const mount = ()  => {
//   useEffect(()=>{

//   }, [])
// }
