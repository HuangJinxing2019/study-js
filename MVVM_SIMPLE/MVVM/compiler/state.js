import {randomNum} from "../shared";

const reg_html = /\<.+?\>\{\{(.+?)\}\}\<\/.+?\>/g;
const reg_tag = /\<(.+?)\>/
const reg_value = /\{\{(.+?)\}\}/g

export const statePool = [];
let o = 0;

// 编译数据标签，
export const stateCompiler = (template, state) => {
  let _state = {}
  // 处理带有{{ xx }}的标签，增加data-mark标记，并将标记添加到statePool数组中保存
  template = template.replace(reg_html, function (node,key){
    const matched = node.match(reg_tag);
    const _mark = randomNum();
    _state.mark = _mark;
    statePool.push(_state);
    _state = {};

    return `<${matched[1]} data-mark="${_mark}">{{${key}}}</${matched[1]}>`
  })

  // 替换 {{ xxx }}, 将双大括号内内的内容值保存到对应的statePool中。
  template = template.replace(reg_value, function (node, key){
    // key可能是 a.b 的形式，将它分割成数组的形式。
    let keys = key.trim().split('.');
    let n = 0,
        _val = state;
    // keys 中可能存在可能是多个，使用while循环拿到正确的值
    while(n < keys.length){
      _val = _val[keys[n]]
      n++
    }
    // 将keys保存到对应的statePool中
    statePool[o].state = keys;
    o++;
    return _val
  })
  return template
}