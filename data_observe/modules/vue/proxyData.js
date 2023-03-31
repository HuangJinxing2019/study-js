export function proxyData(target, sourceKey, key){
  Object.defineProperty(target, key, {
    get(){
      return target[sourceKey][key]
    },
    set(v) {
      target[sourceKey][key] = v
    }
  })
}