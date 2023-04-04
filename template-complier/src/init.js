import {initState} from "./state";
import { compilerToRenderFunction } from "./compiler";
import {mountComponent} from "./lifeCycle";

export function initMixin(Vue){
  Vue.prototype._init = function (options){
    const vm = this
    vm.$options = options
    initState(vm)
    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }
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
    mountComponent(vm);
  }
}