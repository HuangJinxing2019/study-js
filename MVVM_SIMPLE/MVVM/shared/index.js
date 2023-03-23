const reg_check_str = /^[\'|\"].*?[\"|\']/;
const reg_str = /[\'|\"]/g
export const isObject = function (data){
  return typeof data === 'object' && data !== null
}
export const randomNum = () => {
  return parseInt(new Date().getTime() + Math.random() * 1000)
}
export const hasOwnProperty = (target, key) => {
  return Object.hasOwn(target, key)
}
export const isEqual = (value, oldValue) => {
  return value === oldValue;
}
export const checkType = (str) => {
  let isStr = reg_check_str.test(str);
  if(isStr){
    return str.replace(reg_str, '');
  }
  switch (str){
    case 'true':
      return true
    case 'false':
      return false
    default:
      break;
  }
  return Number(str)
}