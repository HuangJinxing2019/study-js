import array from "../../data_observe/modules/vue/array";

export function proxy(target, sourceKey, key){
  Object.defineProperty(target, key, {
    get(){
      return target[sourceKey][key]
    },
    set(val){
      if(target[sourceKey][key] === val) return;
      target[sourceKey][key] = val
    }
  })
}

export function isObject(value){
  return typeof value === 'object' && value !== null
}
export function setConstantProperty(data, key, value){
  Object.defineProperty(data, key, {
    enumerable: false,
    configurable: false,
    value
  })
}

export function isArray(value){
  return Array.isArray(value)
}