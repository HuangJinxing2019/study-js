import { checkType, randomNum } from "../shared";
const reg_onClick = /onClick\=\"(.+?)\"/g;
const reg_fnName = /^(.*?)\(/
const reg_arg = /\((.*?)\)/;

let eventPool = []
// 处理事件标签，收集事件， 并将内容替换为 `data-mark="${_mark}"`，
export const eventCompile = (template) => {
  return template.replace(reg_onClick, function (node, key){
    const _mark = randomNum()
    // 收集事件方法
    eventPool.push({
      mark: _mark,
      handle: key.trim(),
      type: 'click'
    })
    return `data-mark="${_mark}"`
  })
}

// 绑定事件
export const bindEvent = (methods) => {
  // 获取所有元素
  const elems = document.querySelectorAll('*');
  let elemItem = null;
  // 遍历在模板编译是收集的事件处理对象
  eventPool.forEach(event => {
    // 遍历元素节点 找到相同的mark，绑定事件
    for(let i = 0; i < elems.length; i++){
      elemItem = elems[i]
      if(parseInt(elemItem.dataset.mark) === event.mark){
        // 添加事件绑定
        elemItem.addEventListener(event.type, () => {
          // 获取时间名称
          const changeName = event.handle.match(reg_fnName)[1]
          // 获取参数
          let arg = event.handle.match(reg_arg)[1];
          // checkType(arg) 参数类型转化
          // 执行函数
          methods[changeName](checkType(arg))
        }, false)
      }
    }
  })
}

