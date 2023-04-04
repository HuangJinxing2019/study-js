import {patch} from "./vdom/patch";

export function mountComponent (vm){
    vm._update(vm._render())
}
export function lifeCycleMixin(Vue){
    Vue.prototype._update = function (vnode){
        const vm = this;
        patch(vm.$el, vnode)
    }
}