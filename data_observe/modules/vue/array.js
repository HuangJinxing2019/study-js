import {observe} from "./observe";
import {observeArray} from "./observeArray";

const arrPrototype = Array.prototype,
      arrMethods = Object.create(arrPrototype);
let arrProto = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'splice',
  'reverse',
]
arrProto.map(m => {
  arrMethods[m] = function (){
    console.log('拦截了数组的方法')
    const args = Array.prototype.slice.call(arguments),
          rt = arrPrototype[m].apply(this, args);
    let newArr;
    switch (m){
      case 'push':
      case 'shift':
        newArr = args
        break;
      case 'splice':
          newArr = args.slice(2)
        break;
      default:
        break;
    }
    if(newArr) observeArray(newArr)
    return rt
  }
})

export default arrMethods