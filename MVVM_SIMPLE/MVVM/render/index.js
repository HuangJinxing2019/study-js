import {eventCompile} from "../compiler/event";
import {stateCompiler} from "../compiler/state";

export const render = (template, state) => {
  // 编译事件处理函数，将事件处理函数打上标记，在渲染完成时添加事件监听使用
  template = eventCompile(template);

  // 编译有变量的标签，在标签上打上标记，在数据更新时获取元素的标记进行比对更新页面数据
  template = stateCompiler(template, state)
  return template
}
// 更新页面数据
export const update = (statePool, key, value) => {
  console.log(statePool, key, value)
  // 查询所有元素节点信息
  const allElements = document.querySelectorAll('*');
  let oItem = null;
  // 遍历收集的数据依赖数组
  statePool.forEach(item => {
    // 判断当前项的state最后一项key 是否和数据改变得key相同
    if(item.state[item.state.length - 1] === key){
      // 遍历所有元素节点，获取元素节点上mark的属性值，找到与item.mark相等的元素，并更新元素值
      for(let i = 0; i < allElements.length; i++){
        oItem = allElements[i];
        const _mark = parseInt(oItem.dataset.mark);
        if(item.mark === _mark){
          console.log(value)
          oItem.innerHTML = value
        }
      }
    }
  })
}