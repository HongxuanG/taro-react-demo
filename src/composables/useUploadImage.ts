import Taro from '@tarojs/taro'
import { UPLOAD_CDN_URL } from '@/utils/constant'
import { GetSignApi } from '@/api/cdn'

export default () => {
  const { fetchData: GetSign } = GetSignApi()

  // 上传图片 获取auth，Policy
  /*
    scene 场景值，区分上传文件的根路径
    type  类型值，区分上传业务bucket
    */
  const getSecret = (scene, type) => {
    return new Promise(async (resolve, reject) => {
      const SAVE_PATH = `/${scene}/{filemd5}{day}{hour}{min}{sec}{.suffix}`

      let params = {
        method: 'post',
        save_key: SAVE_PATH
      }
      // 获取签名
      let res = await GetSign(params)
      if (res.success) {
        resolve(res.data)
      } else {
        reject({
          code: res.code || '9999',
          msg: res.msg
        })
      }
    })
  }
  const getFileType = name => {
    if (!name) return false
    var imgType = ['gif', 'jpeg', 'jpg', 'bmp', 'png']
    var videoType = [
      'avi',
      'wmv',
      'mkv',
      'mp4',
      'mov',
      'rm',
      '3gp',
      'flv',
      'mpg',
      'rmvb',
      'quicktime'
    ]

    if (RegExp('.?(' + imgType.join('|') + ')$', 'i').test(name.toLowerCase())) {
      return 'image'
    } else if (RegExp('.(' + videoType.join('|') + ')$', 'i').test(name.toLowerCase())) {
      return 'video'
    } else {
      return false
    }
  }

  /**
   *
   * @param {*} file 传入文件
   * @param {String} secene 传入 'product'
   * @param {String} type  传入 'product'
   * @returns
   */
  const uploadCDNImg = (file, secene, type) => {
    let filetype = file.path
    console.log('filetype::', filetype)
    if (!getFileType(filetype)) {
      Taro.showToast({
        title: '上传文件类型错误',
        icon: 'none',
        duration: 3800
      })
      return false
    }

    return new Promise((resolve, reject) => {
      getSecret(secene, type)
        .then(result => {
          let res: any = result
          console.log('bucket', res.bucket)
          var formdata = {
            authorization: res.authorization,
            policy: res.policy
          }

          const uploadTask = Taro.uploadFile({
            url: `${UPLOAD_CDN_URL}${res.bucket}`,
            formData: formdata,
            filePath: file.path,
            name: 'file',
            success: rst => {
              resolve(JSON.parse(`${rst.data}`))
            },
            fail: err => {
              console.log(err)
              reject(err)
            }
          })

          uploadTask.progress(rst => {
            console.log('上传进度', rst.progress)
            if (rst.progress < 100) {
              Taro.showLoading({
                title: '上传中...'
              })
            } else {
              Taro.hideLoading()
            }
          })
        })
        .catch(result => {
          reject(result)
          Taro.showToast({
            title: '获取密钥失败！',
            icon: 'none',
            duration: 3800
          })
        })
    })
  }

  //  product	产品相关，图片、纹理图等	全平台
  //  after-sale	售后（申请退货、退款）相关的、图片、视频	全平台
  //  mall	电子商城相关的	全平台
  //  logistics	物流（发货、提货）相关的、图片、视频	全平台
  type cdn_upload_type_Param = 'product' | 'after-sale' | 'mall' | 'logistics'
  /**
   * 上传手机图片
   * @param cdn_upload_type 场景值
   * @param count  // 1时返回一张图片信息， 大于1时返回图片数组
   * @returns
   */
  const getWxPhoto = (cdn_upload_type: cdn_upload_type_Param, count: number = 1) => {
    return new Promise((resolve, reject) => {
      let list: any[] = []
      Taro.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: async function (res) {
          try {
            if (count > 1) {
              for (let i = 0; i < res.tempFiles.length; i++) {
                let data = await uploadCDNImg(res.tempFiles[i], cdn_upload_type, cdn_upload_type)
                list.push(data)
              }
              resolve(list)
            } else {
              //兼容以前上传一张的情况
              let data = await uploadCDNImg(res.tempFiles[0], cdn_upload_type, cdn_upload_type)
              resolve(data)
            }
          } catch (err) {
            reject(err)
          }
        }
      })
    })
  }

  return {
    uploadCDNImg,
    getWxPhoto
  }
}
