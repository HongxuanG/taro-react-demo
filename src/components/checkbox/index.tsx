import classnames from 'classnames'
import { View } from '@tarojs/components'
import React, { useState } from 'react'
import styles from './index.module.scss'
type CheckboxSize = 'mini' | 'normal' | 'large'
type CheckboxProps = {
  disabled?: boolean
  size?: CheckboxSize
  checked?: boolean
  iconClass?: string
  onChange: (checked: boolean) => void
}
const Checkbox: React.FC<CheckboxProps> = props => {
  console.log('render')
  const { size, checked = false, disabled = false, iconClass } = props
  let baseStyle
  switch (size) {
    case 'mini':
      baseStyle = styles['checkbox__size-mini']
      break
    case 'normal':
      baseStyle = styles['checkbox__size-normal']
      break
    case 'large':
      baseStyle = styles['checkbox__size-large']
      break
    default:
      baseStyle = styles['checkbox__size-mini']
      break
  }
  const handleCheck = () => {
    if (disabled) {
      return
    }
    props.onChange(!checked)
  }
  const Icon = () => {
    return (
      <View
        className={classnames(
          styles[`checkbox__${size}-icon`],
          iconClass ? iconClass : 'iconfont icon-ictick'
        )}
      ></View>
    )
  }
  return (
    <View className={classnames(styles['checkbox'], baseStyle)} onClick={handleCheck}>
      {checked ? Icon() : null}
      {props.children}
    </View>
  )
}

export default Checkbox
