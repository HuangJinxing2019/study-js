import {initState} from "./state";
import { compilerToRenderFunction } from "./compiler";

export function initMixin(Vue){
  Vue.prototype._init = function (options){
    const vm = this
    vm.$options = options
    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }
    initState(vm)
  }
  Vue.prototype.$mount = function (el){
    const vm = this,
          options = vm.$options;
    vm.$el = document.querySelector(el);
    if(!options.render){
      let template = options.template;
      if(!template && el){
        template = vm.$el.outerHTML;
      }
      const render = compilerToRenderFunction(template);
      options.render = render;
    }
  }
}