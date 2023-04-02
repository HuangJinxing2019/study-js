import {proxy} from "./utils";
import {observe} from "./observer";

export function initState(vm){
  const options = vm.$options;
  if(options.data){
    initData(vm)
  }
}
function initData(vm){
  let data = vm.$options.data;
  vm._data = data = typeof data === 'function' ? data.call(vm) : data

  for (let key in data){
    if(Object.hasOwn(data, key)){
      proxy(vm, '_data', key)
    }
  }
  observe(data)
}