import { AContext } from '@/pages/helloWorld/context'
import { View } from '@tarojs/components'
import { useCallback, useContext, useState } from 'react'

const C: React.FC = () => {
  const value = useContext(AContext)
  const [state, setState] = useState(1)
  const onClick = useCallback(() => {
    console.log('点击')
    setState(state + 1)
  }, [state])
  return (
    <View onClick={onClick}>
      我是C组件 {value.name}
      {state}
    </View>
  )
}
export default C
