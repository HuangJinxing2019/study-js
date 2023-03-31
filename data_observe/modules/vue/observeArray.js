import {observe} from "./observe";

export function observeArray(arr){
  for(let item of arr){
    observe(item);
  }
}