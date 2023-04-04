import {createElement, createTextVnode} from "./vnode";

export function renderMixin(Vue){
    Vue.prototype._render = function (){
        const vm = this,
            render = vm.$options.render,
            vnode = render.call(vm);
        return vnode;
    }
    Vue.prototype._v = function (text) {
        return createTextVnode(text)
    }
    Vue.prototype._s = function (value) {
        if(value === null) return
        console.log(typeof value)
        return value
    }
    Vue.prototype._c = function (){
        return createElement(...arguments)
    }
}