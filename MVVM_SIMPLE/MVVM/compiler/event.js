import { checkType, randomNum } from "../shared";
const reg_onClick = /onClick\=\"(.+?)\"/g;
const reg_fnName = /^(.*?)\(/
const reg_arg = /\((.*?)\)/;

let eventPool = []
export const eventCompile = (template, methods) => {
  return template.replace(reg_onClick, function (node, key){
    const _mark = randomNum()
    eventPool.push({
      mark: _mark,
      handle: key.trim(),
      type: 'click'
    })
    return `data-mark="${_mark}"`
  })
}

export const bindEvent = (methods) => {
  const elems = document.querySelectorAll('*');
  let elemItem = null;
  eventPool.forEach(event => {
    for(let i = 0; i < elems.length; i++){
      elemItem = elems[i]
      if(parseInt(elemItem.dataset.mark) === event.mark){
        elemItem.addEventListener(event.type, () => {
          const changeName = event.handle.match(reg_fnName)[1]
          let arg = event.handle.match(reg_arg)[1];
          methods[changeName](checkType(arg))
        }, false)
      }
    }
  })
}

