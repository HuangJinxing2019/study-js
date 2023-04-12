import { Lazyload } from "./Lazyload";

export default {
    install(Vue, options){
        // 创建一个Lazy对象，将使用v-lazy的元素全部添加到这个对象的属性集合里。
        const LazyClass = Lazyload(Vue),
            lazyLoad = new LazyClass(options)
        Vue.directive('lazy', {
            // bind参数具有 el bindings vnode oldValue value
            bind: lazyLoad.bindLazy.bind(lazyLoad)
        })
    }
}