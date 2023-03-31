import {Observer} from "./Observer";

export function observe(data){
  if(typeof data !== 'object' || data === null) return
  new Observer(data)
}