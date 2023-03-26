export default class Computed {
  constructor() {
    this.computedData = []
  }
  addComputed(vm, computed, key){
    const descriptor = Object.getOwnPropertyDescriptor(computed, key),
        descriptorFn = descriptor.value.get ? descriptor.value.get : descriptor.value,
        value = descriptorFn.call(vm),
        get = descriptorFn.bind(vm),
        dep = this._collectDep(descriptorFn)
    const data = {
      key,
      value,
      get,
      dep
    }
    this.addComputedData(data)
    Object.defineProperty(vm, key, {
      get(){
        return data.value
      },
      set(v) {
        vm[key] = data.get()
      }
    })
  }
  addComputedData(data){
    this.computedData.push(data)
  }
  update(key, watch){
    this.computedData.map(item => {
      const prop = item.dep.find(_item => _item === key)
      if(prop){
        const oldValue = item.value;
        item.value = item.get();
        watch && watch(key, oldValue,item.value)
      }
    })
  }
  _collectDep(fn){
    const matched = fn.toString().match(/this\.(.+?)/g);
    if(matched){
      return matched.map(item => item.split('.')[1])
    }
    return []
  }
}