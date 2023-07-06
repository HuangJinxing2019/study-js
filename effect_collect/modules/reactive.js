import {isObject} from "./utils";
import Dep from "./Dep";
const dep = new Dep();

export function reactive(data){
  if(!isObject(data)) return;
  return new Proxy(data, {
    get(target, key){
      const value = Reflect.get(target, key);
      // 收集依赖
      if(Dep.callback){
        dep.collect(target, key)
      }
      return isObject(value) ? reactive(value) : value
    },
    set(target, key, value){
      const oldValue = target[key];
      const res = Reflect.set(target, key, value)
      dep.notify(target, key, value, oldValue)
      return res
    }
  })
}