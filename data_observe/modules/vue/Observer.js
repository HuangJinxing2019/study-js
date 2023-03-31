import {defineReactive} from "./defineReactive";
import arrMethods from "./array";
import {observeArray} from "./observeArray";

export function Observer(data){
   if(Array.isArray(data)){
     observeArray(data)
    data.__proto__ = arrMethods
   } else {
     this.walk(data)
   }
}

Observer.prototype.walk = function (data){
  for (let key in data){
    if(Object.hasOwn(data, key)){
      defineReactive(data, key, data[key])
    }
  }
}