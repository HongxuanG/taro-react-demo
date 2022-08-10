import Checkbox from '@/components/Checkbox'
import WeightMemoItem from '@/components/WeightMemoItem/index'
import { View } from '@tarojs/components'
import { useState } from 'react'
import './index.module.scss'

const Index = () => {
  const [weightList, setWeightList] = useState(() => {
    return [
      {
        id: 1,
        checked: false,
        url: 'https://s1.ax1x.com/2022/07/03/j8Tusx.png',
        title: 'vue3手写源码1',
        desc: '欢迎学习vue3源码'
      },
      {
        id: 2,
        checked: false,
        url: 'https://s1.ax1x.com/2022/07/03/j8Tusx.png',
        title: 'vue3手写源码2',
        desc: '欢迎学习vue3源码2'
      },
      {
        id: 3,
        checked: false,
        url: 'https://s1.ax1x.com/2022/07/03/j8Tusx.png',
        title: 'vue3手写源码3',
        desc: '欢迎学习vue3源码3'
      },
      {
        id: 4,
        checked: false,
        url: 'https://s1.ax1x.com/2022/07/03/j8Tusx.png',
        title: 'vue3手写源码4',
        desc: '欢迎学习vue3源码4'
      },
      {
        id: 5,
        checked: false,
        url: 'https://s1.ax1x.com/2022/07/03/j8Tusx.png',
        title: 'vue3手写源码5',
        desc: '欢迎学习vue3源码5'
      }
    ]
  })
  type WeightListItem = typeof weightList[number]
  const handleCheckboxChange = (id: number, isCheck: boolean) => {
    console.log('isCheck==>', isCheck)
    let newList: WeightListItem[] = []
    weightList.map((item: WeightListItem) => {
      if (item.id === id) {
        item.checked = isCheck
      }
      newList.push(item)
    })
    setWeightList(newList)
  }
  return (
    <View>
      {weightList.map(({ checked, url, desc, title, id }) => {
        return (
          <Checkbox
            checked={checked}
            size='normal'
            onChange={isCheck => handleCheckboxChange(id, isCheck)}
          >
            <WeightMemoItem url={url} title={title} desc={desc} />
          </Checkbox>
        )
      })}
    </View>
  )
}
export default Index
