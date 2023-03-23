const reg_str = /^[\'|\"].*?[\"|\']/;
export const isObject = function (data){
  return typeof data === 'object' && data !== null
}
export const randomNum = () => {
  return parseInt(new Date().getTime() + Math.random() * 1000)
}
export const checkType = (str) => {
  let isStr = reg_str.test(str);
  if(isStr){
    return str;
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