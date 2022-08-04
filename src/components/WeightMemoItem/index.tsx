import { View, Image } from '@tarojs/components'

type PropsType = {
  url: string
  title: string
  desc: string
}
const WeightMemoItem = ({ url, title, desc }: PropsType) => {
  return (
    <View className='ul-container'>
      <View className='li-container'>
        <View className='leftSlot'>
          <Image src={url}></Image>
        </View>
        <View className='rightSlot'>
          <View className='title'>{title}</View>
          <View className='desc'>{desc}</View>
        </View>
      </View>
    </View>
  )
}
export default WeightMemoItem
