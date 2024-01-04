import { effectScope, ref } from "vue";
import { PINIA_SYMBOL } from "@/pinia/utils.js";

export default function createPinia(){

    const scope = effectScope(true);
    // pinia中包括所有子模块的state
    const state = scope.run(() => ref({}))
    // store所有模块的集合及子模块的getters、actions方法
    const store = new Map();
    // 插件回调函数收集
    const plugins = [];

    return {
        install, // install
        scope, // _e
        state, // state
        store, // _s
        plugins, // _p
        use,
    }
    function use (cb) {
        plugins.push(cb);
        return this;
    }
    function install(app){
        // 将pinia添加到Provide中
        app.provide(PINIA_SYMBOL, this);
    }
}

