import { isObject } from "../shared";
import { useReactive } from "./index";

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
    console.log('进行了设置操作：' + key +"_"+value)
    return Reflect.set(target, key, value, receiver)
  }
}
const proxyHandle = {
  get,
  set,
}
export default proxyHandle