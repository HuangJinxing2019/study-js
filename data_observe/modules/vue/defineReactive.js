import {observe} from "./observe";

export function defineReactive(target, key, value){
  observe(value)
  Object.defineProperty(target, key, {
    get(){
      console.log('获取属性key:' + key + ' 值为：'+ value)
      return value
    },
    set(val){
      console.log('设置属性key:' + key + ' 值为：'+ val)
      observe(val)
      value = val
    }

  })
}