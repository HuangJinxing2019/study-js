import {render} from "./render";
import {bindEvent} from "./compiler/event";

export const createApp = (opt) => {
  opt.el.innerHTML = render(opt.template, opt.state)
  bindEvent(opt.methods)
}