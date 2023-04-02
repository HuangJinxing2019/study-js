import {isObject} from "../../../MVVM_SIMPLE/MVVM/shared";
import {setConstantProperty, isArray} from "../utils";
import {arrMethods} from "./array";

class Observer{
  constructor(data) {
    setConstantProperty(data, '__ob__', this)
    if(isArray(data)){
      data.__proto__ = arrMethods
      this.observeArr(data)
    }else {
      this.walk(data)
    }
  }
  walk(data){
    const keys = Object.keys(data)
    for(let key of keys){
      defineReactive(data, key, data[key])
    }
  }
  observeArr(arr){
    for (let item of arr){
      observe(item)
    }
  }
}

function defineReactive(target, key, value){
  observe(value)
  Object.defineProperty(target, key, {
    get(){
      console.log(`数据获取${key} value: ${value}`)
      return value
    },
    set(newValue){
      if(newValue === value) return
      console.log(`数据设置${key} value: ${newValue}`)
      observe(newValue)
      value = newValue
    }
  })
}

export function observe(data){
  if (!isObject(data) || data.__ob__) return data
  new Observer(data)
}