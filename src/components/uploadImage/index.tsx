import Taro, { FC } from '@tarojs/taro'
import { memo, useEffect, useState } from 'react'
import useUploadCDNImg from '@/composables/useUploadImage'
import { Image, Text, View } from '@tarojs/components'
import { formatImgUrl } from '@/utils/format'
import classnames from 'classnames'
import styles from './index.scss'

//图片列表
type ImageParam = {
  onChange?: (val: string[]) => void
  defaultList?: string[]
  onlyRead?: false | true
}
const PictureItem: FC<ImageParam> = memo(({ onChange, defaultList, onlyRead = false }) => {
  const { getWxPhoto } = useUploadCDNImg()
  const [imageList, setImageLise] = useState<string[]>([])

  useEffect(() => {
    setImageLise(defaultList || [])
  }, [defaultList])

  //上传图片
  const uploadImage = async () => {
    let list: any = await getWxPhoto('after-sale', 5)
    let images: any[] = []
    list?.map(item => {
      images.push(item.url)
    })
    setImageLise([...imageList, ...images])
  }
  //删除图片
  const delImage = index => {
    imageList.splice(index, 1)
    setImageLise(() => [...imageList])
  }
  //监听上传的图片变化
  useEffect(() => {
    onChange?.(imageList)
  }, [imageList])

  //预览图片
  const showImage = () => {
    let list = imageList?.map(item => {
      return formatImgUrl(item, '!w800')
    })
    Taro.previewImage({
      current: list[0], // 当前显示
      urls: list // 需要预览的图片http链接列表
    })
  }

  return (
    <View className={styles.image_main}>
      {imageList?.map((item, index) => (
        <View className={styles.ImgItem} key={item + index}>
          <Image mode='aspectFill' src={formatImgUrl(item)} onClick={showImage}></Image>
          {!onlyRead && (
            <View
              onClick={() => delImage(index)}
              className={classnames(styles.miconfont_close, 'iconfont icon-qingkong')}
            ></View>
          )}
        </View>
      ))}
      {!onlyRead && (
        <View className={styles.uploadImg} onClick={uploadImage}>
          <Text className={classnames(styles.miconfont, 'iconfont icon-saomazhifu')}></Text>
          <Text className={styles.uploadText}>上传照片</Text>
        </View>
      )}
    </View>
  )
})

export default PictureItem
