const arrPrototype = Array.prototype,
      arrMethods = Object.create(arrPrototype);
const arrProtoMethods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'sort',
  'splice',
  'reverse'
]
arrProtoMethods.map(m => {
  arrMethods[m] = function (...args){

    const result = arrPrototype[m].apply(this, args),
          ob = this.__ob__;
    let newArr;
    switch (m){
      case 'push':
      case 'unshift':
        console.log(`数组方法拦截push/unshift：${args}`)
        newArr = args;
        break;
      case 'splice':
        console.log(`数组方法拦截slice：${args}`)
        newArr = args.slice(2)
        break;
      default:
        break;
    }
    if(newArr) ob.observeArr(newArr);
    return result;
  }
})
export {
  arrMethods
}