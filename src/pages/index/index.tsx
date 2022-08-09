import Checkbox from '@/components/Checkbox'
import WeightMemoItem from '@/components/WeightMemoItem/index'
import { View } from '@tarojs/components'
import { useState } from 'react'
import './index.module.scss'

const Index = () => {
  const [checked, setChecked] = useState(false)
  const handleCheckboxChange = (isCheck: boolean) => {
    setChecked(isCheck)
  }
  return (
    <View>
      <Checkbox checked={checked} size='normal' onChange={handleCheckboxChange}></Checkbox>
      <WeightMemoItem
        url='https://s1.ax1x.com/2022/07/03/j8Tusx.png'
        title='Diff算法的图解'
        desc='欢迎来学习vue3的diff算法'
      />
    </View>
  )
}
export default Index
