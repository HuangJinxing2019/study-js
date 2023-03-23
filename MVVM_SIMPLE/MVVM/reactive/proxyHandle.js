import {hasOwnProperty, isEqual, isObject} from "../shared";
import { useReactive } from "./index";
import {update} from "../render";
import {statePool} from "../compiler/state";

const get = createGetter();
const set = createSetter();

function createGetter(){
  return function get (target, key, receiver){
    let res = Reflect.get(target, key, receiver)
    console.log('获取值操作：'+ key)
    // 判断res是否为对象，如果是返回一个代理对象
    return  isObject(res) ? useReactive(target[key]) : res
  }
}
function createSetter(){
  return function set(target, key, value, receiver){
    const isKeyExist = hasOwnProperty(target, key),
          oldValue = target[key],
          res = Reflect.set(target, key, value, receiver)
    console.log('进行了设置操作：' + key +"_"+value)
    if(!isKeyExist){

    }else if(!isEqual(value, oldValue)){
      // 更新更新页面
      update(statePool, key, value)
    }
    return res
  }
}
const proxyHandle = {
  get,
  set,
}
export default proxyHandle