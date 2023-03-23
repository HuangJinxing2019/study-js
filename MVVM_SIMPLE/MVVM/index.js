import {render} from "./render";
import {bindEvent} from "./compiler/event";

export const createApp = (opt) => {
  // 渲染页面
  opt.el.innerHTML = render(opt.template, opt.state)
  //绑定事件处理函数
  bindEvent(opt.methods)
}