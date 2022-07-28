/**
 * 防抖
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
export const debounce = (fn, delay) => {
  let timer:any = null;
  return (...param) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...param);
    }, delay);
  };
}

/**
 * 节流
 * @param {*} fn 
 * @param {*} delay 
 * @returns 
 */
export const throttle = (fn, delay) => {
  let pre = 0;
  return (...params) => {
    let now = new Date().getTime();
    if (now - pre > delay) {
      fn(...params);
      pre = now;
    }
  };
}


/**
 * 批量过滤对象值为空的属性
 * @param {Object} val 需要过滤的对象
 * @param {Array}  arr 排除过滤的属性
 * @returns 
 */
 export const getFilterData = (val = {}, arr: string[] = []) => {
  let res = {}
  for(let key in val) {
    if(val[key]!==undefined&&val[key]!==null&&val[key]!==''&&(!arr.includes(key))){
      if(typeof val[key] ==  'number'){
        if(!isNaN(val[key])) {
          res[key] = val[key]
        }
      } else{
        res[key] = val[key]
      }
    }
  }
  return res
}
/**
 * 对象深拷贝
 * @param {*} object 
 * @returns 
 */
 export const copyObject = (object)=>{
  if(object.constructor==Object){
      let keys = Object.keys(object);
      let newObject = {};
      keys.map(key=>{
          newObject[key]= copyObject(object[key]);
      })
      return newObject;
  }else if(object.constructor==Array){
      return object.map(item=>{
          return copyObject(item);
      })
  }else{
      return object;
  }
}

/**
 * 
 * @param {*} suffix 
 * !w80
    !w100
    !w160
    !w200
    !w400
    !w800
    !wh400
    !w600
 */
 export const screenshot = (url, suffix="!w200")=>{
   return url+suffix;
 }

 //获取数据加载状态 //0:数据从无到有加载数据，1，没有任何数据， 2：下拉加载，3：下拉没有数据
 export const dataLoadingStatus = ({list = [], total = 0, status = false}:{list:any[], total:number,  status:true|false}) => {
  if(list.length == 0 && status) {
    return 0
  } else if (list.length == 0 && !status) {
    return 1
  } else if (list.length < total) {
    return 2
  } else {
    return 3
  }
 }