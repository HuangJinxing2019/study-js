import {proxyData} from "./proxyData";
import { observe } from "./observe";
export function initState(vm){
  const data = vm._data = vm.$options.data()
  for(let key in data){
    if(Object.hasOwn(data, key)){
      proxyData(vm, '_data', key);
    }
  }
  observe(data)
}