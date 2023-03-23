const reg_value = /\{\{(.+?)\}\}/g
export const stateCompiler = (template, state) => {
  return template.replace(reg_value, function (node,key){
    let keys = key.trim().split('.');
    let n = 0,
        _val = state
    while(n < keys.length){
      _val = _val[keys[n]]
      n++
    }
    return _val
  })
}