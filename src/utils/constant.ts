// export const BASE_URL = CURRENT_ENV.includes('development') ? `https://test.zzfzyc.com/lymarket` : `https://www.zzfzyc.com/lymarket`
// export const BASE_URL = `http://192.168.0.75:50001/lymarket`
// export const BASE_URL = `http://192.168.0.89:50001/lymarket`
// export const BASE_URL = `http://10.0.0.5:50001/lymarket`
// export const BASE_URL = `http://192.168.0.89:40001/lymarket`
// export const BASE_URL = `http://192.168.1.165:40001/lymarket` // 王霞
export const BASE_URL = `https://test.zzfzyc.com/lymarket`; // 测试环境
// export const BASE_URL = `http://192.168.1.9:40001/lymarket` // 发
// export const BASE_URL = `http://192.168.1.9:50005/lymarket` // 发
// export const BASE_URL = `http://192.168.1.30:50001/lymarket` // 发
// export const BASE_URL = `https://dev.zzfzyc.com/lymarket`  // 开发环境
// export const BASE_URL = `https://www.zzfzyc.com/lymarket`  // 正式环境
// export const BASE_URL = `http://192.168.1.5:40001/lymarket` // 王霞
// export const BASE_URL = `http://192.168.1.7:50002/lymarket` // 添
// export const BASE_URL = `http://192.168.1.42:50001/lymarket` // 杰

// CDN
// 生成密钥
export const GET_UPLOAD_SIGN = `/upyun/getsign`; // 请求签名 url
export const UPLOAD_CDN_URL = `https://v0.api.upyun.com/`;

// cdn
export const IMG_CND_Prefix = CURRENT_ENV.includes("development")
  ? "https://test.cdn.zzfzyc.com"
  : "https://cdn.zzfzyc.com";

//在线支付图片baseUrl
export const CAP_HTML_TO_IMAGE_BASE_URL = CURRENT_ENV.includes("development")
  ? "https://test.zzfzyc.com"
  : "https://www.zzfzyc.com";

// 上传图片视频
export const CDN_UPLOAD_IMG = `${UPLOAD_CDN_URL || ""}`;

//appid
export const WX_APPID = "测试账号";

//场景值
export const SCENE = {
  SearchScene: 0, //商城面料搜索
};
