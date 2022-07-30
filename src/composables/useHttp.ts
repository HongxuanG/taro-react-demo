import Taro from '@tarojs/taro'
import { useRef, useState } from 'react'
import { BASE_URL, WX_APPID } from '@/utils/constant'
import qs from 'qs'

type Params = {
  code: string | null
  success: true | false
  data: any
  msg: string
  loading: true | false
  error: any
  query: any
  filter: any
  sort: any
  total: number
  multiple: true | false // 请求多次
  count: number // 第几次请求
  token: string // token
  page?: number
  pageSize?: number
}

type option = {
  url?: string
  method?: 'get' | 'post' | 'put' | 'delete'
  type?: string
  data?: any
  page?: number
  pageSize?: number
  pagination?: true | false
  base_url?: string
  apiMsgStatus?: true | false
}

/**
 * 返回状态信息，根据 http 状态错
 * @param {Number} status
 * @returns
 */
const showStatus = status => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

/**
 * axios 请求状态封装，返回响应式数据 fetch(), loading, error, code, msg 等常用方法/状态
 * @param {Object} options 对象
 * @param {String} options.url 请求的URL
 * @param {String} options.method 请求的方法
 * @param {Object} options.data 请求的参数
 * @returns {Object} 返回fetch(), loading, error, code, msg
 */
export const useRequest = (
  options: option = {
    url: '/',
    method: 'get',
    type: 'json',
    data: {},
    page: 1,
    pageSize: 24,
    pagination: false, // 是否分页
    base_url: '',
    apiMsgStatus: true //是否直接弹出后端错误
  }
) => {
  options.url = `${options.base_url || BASE_URL}${options.url}`
  let params: Params = {
    code: null, // 业务码
    success: false, // 请求是否成功
    data: {},
    msg: '',
    loading: false,
    error: null,
    query: {},
    filter: null,
    sort: '',
    total: 0,
    multiple: true, // 请求多次
    count: 0, // 第几次请求
    token: '' // token
  }

  const stateRef = useRef({ ...params })
  const [state, setState] = useState({ ...stateRef.current })

  // 请求函数
  const fetchData = async (sub_options?: any) => {
    stateRef.current.loading = true
    setState(e => ({ ...e, loading: true }))
    stateRef.current.query = {
      ...sub_options,
      ...(options.pagination && {
        page: stateRef.current.page,
        size: stateRef.current.pageSize
      }),
      ...stateRef.current.filter,
      ...stateRef.current.sort
    }
    try {
      let token = Taro.getStorageSync('token')
      const q = {
        ...options,
        ...{
          header: {
            Platform: 6,
            Appid: WX_APPID,
            Authorization: token || stateRef.current.token
          }
        },
        ...(options.method?.toUpperCase() == 'GET'
          ? {
              data: stateRef.current.query
            }
          : {
              data:
                options.type?.toUpperCase() == 'FORMDATA'
                  ? qs.stringify(stateRef.current.query)
                  : stateRef.current.query
            })
      }
      const result = await Taro.request(q as any)
      const { statusCode } = result
      const { code, msg, data } = result.data
      if (statusCode === 200) {
        Object.assign(stateRef.current, {
          success: code === 0 ? true : false,
          code: code,
          msg: msg,
          data: data,
          total: data?.list ? data?.total : 0
        })
        if (code !== 0) {
          options.apiMsgStatus !== false &&
            Taro.showToast({
              title: `${msg}`,
              icon: 'none'
            })
          console.log('错误：：', msg)
        }
      } else {
        Taro.showToast({
          title: `错误：${showStatus(statusCode)}`,
          icon: 'none'
        })
      }
    } catch (e) {
      Object.assign(stateRef.current, {
        success: false,
        error: true,
        msg: e.errMsg
      })
      console.log('后台错误信息：：', e.errMsg)
    }
    stateRef.current = { ...stateRef.current, error: false, loading: false }
    setState(() => ({ ...stateRef.current }))
    return stateRef.current
  }

  return {
    fetchData,
    state
  }
}
