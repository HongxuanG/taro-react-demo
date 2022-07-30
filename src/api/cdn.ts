import { useRequest } from '@/composables/useHttp'

/**
 *  获取cdn 签名/密钥
 * @returns
 */
export const GetSignApi = () => {
  return useRequest({
    url: `/v1/mall/cdn/token`,
    method: 'get'
  })
}
