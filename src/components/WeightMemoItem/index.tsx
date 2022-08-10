import { View, Image } from '@tarojs/components'
import React from 'react'
import styles from './index.module.scss'

type PropsType = {
  url: string
  title: string
  desc: string
}
const WeightMemoItem: React.FC<PropsType> = ({ url, title, desc }) => {
  return (
    <View className={styles['item-container']}>
      <View className={styles['item-image']}>
        <Image className='image-full' src={url}></Image>
      </View>
      <View className={styles['item-context']}>
        <View className={styles['item-title']}>{title}</View>
        <View className={styles['item-desc']}>{desc}</View>
      </View>
    </View>
  )
}
export default WeightMemoItem
