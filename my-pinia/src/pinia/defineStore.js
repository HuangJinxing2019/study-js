import {getArgs, isFunction, PINIA_SYMBOL, isComputed, subscribeOption} from "@/pinia/utils.js";
import {inject, toRefs, effectScope, computed, reactive, isRef, isReactive} from "vue";
import {
    createOnAction,
    createPatch,
    createReset,
    createState,
    createSubscribe
} from "@/pinia/apiCreator.js";

export default function defineStore(...args) {
    // 获取id、option、setup函数
    const {
        id,
        options,
        setup,
    } = getArgs(args);

    // 用来收集$onAction的回调函数。
    let actionList = [];

    // 判断是setup函数写法还是options写法
    const isSetup = isFunction(setup);

    function useStore() {
        // 注入pinia实例
        const pinia = inject(PINIA_SYMBOL)

        // 判断pinia中是否已存在该store,存在直接将其返回
        if (!pinia.store.get(id)) {
            if (isSetup) {
                createSetupStore(pinia, id, setup);
            } else {
                createOptionStore(pinia, id, options)
            }
        }
        return pinia.store.get(id)
    }

    function createAPIs(pinia, id, scope) {
        return {
            $patch: createPatch(pinia, id),
            $subscribe: createSubscribe(pinia, id, scope),
            $onAction: createOnAction(actionList),
            $dispose: function (){
                actionList = []
                pinia.store.delete(id)
                scope.stop();
            }
        }
    }

    // ================setup函数写法处理=============================
    function createSetupStore(pinia, id, setup) {
        const setupStore = setup();
        let storeScope, store;
        const result = pinia.scope.run(() => {
            storeScope = effectScope(true);
            // 每个store中都有几个Api方法。
            store = reactive(createAPIs(pinia, id, storeScope));
            return storeScope.run(() => compileSetup(pinia, id, setupStore))
        })
        return setStore(pinia, id, store, result);
    }

    // 将setup函数中返回的state设置给pinia的state
    function compileSetup(pinia, id, setupStore) {
        !pinia.state.value[id] && (pinia.state.value[id] = {});
        for (let key in setupStore) {
            let el = setupStore[key];
            if (isRef(el) && !isComputed(el) || isReactive(el)) {
                pinia.state.value[id][key] = el
            }

            // 重写setup里的函数，作用与执行$onAction的回调函数
            if (isFunction(el)) {
                setupStore[key] = function () {
                    const afterList = [];
                    const errorList = [];
                    let res;
                    // 执行前调用$onAction添加的回调函数，并传入执行完成后、执行错误的函数。
                    subscribeOption.trigger(actionList, {after, onError});
                    try {
                        // 函数执行
                        res = el.apply(pinia.state.value[id], arguments);
                    } catch (e) {
                        // 执行出错。执行失败回调
                        subscribeOption.trigger(errorList, e);
                    }
                    // 判断$onAction返回的数据类型
                    if (res instanceof Promise) {
                        res.then(r => {
                            subscribeOption.trigger(afterList, r);
                        }).catch(err => {
                            subscribeOption.trigger(errorList, err);
                        })
                    } else {
                        subscribeOption.trigger(afterList, res);
                    }
                    return res

                    function after(cb) {
                        afterList.push(cb)
                    }

                    function onError(cb) {
                        errorList.push(cb)
                    }
                }
            }
        }
        return {
            ...setupStore
        }
    }

    // ================options写法处理=============================
    function createOptionStore(pinia, id, options) {
        const {
            state,
            getters,
            actions,
        } = options;

        let storeScope, store;
        // 将模块下里的computed、watch等的有副作用的函数包含在全局pinia下的scope下，目的是可以全局一键取消监听。
        const result = pinia.scope.run(() => {
            // 创建模块的scope，作用于单个模块
            storeScope = effectScope(true);
            // 创建点模块store
            store = reactive(createAPIs(pinia, id, storeScope));
            return storeScope.run(() => compileOptions(pinia, id, store, {
                state,
                getters,
                actions,
            }))
        })
        return setStore(pinia, id, store, result, options.state)
    }

    function compileOptions(pinia, id, store, {
        state,
        getters,
        actions,
    }) {
        const storeState = createStoreState(pinia, id, state);
        const storeGetters = createStoreGetters(store, getters);
        const storeActions = createStoreActions(store, actions);
        return {
            ...storeState,
            ...storeGetters,
            ...storeActions
        }
    }

    //  执行state的函数，将返回的对象设置个全局的state，并将这个对象toRefs()返回。
    function createStoreState(pinia, id, state) {
        pinia.state.value[id] = state ? state() : {};
        return toRefs(pinia.state.value[id]);
    }

    // 将getters的属性全部添加到store中。并且getter属性值将是一个computed，注意getters属性函数中this的指向
    function createStoreGetters(store, getters) {
        return Object.keys(getters || {}).reduce((wrapper, getterName) => {
            wrapper[getterName] = computed(() => getters[getterName].call(store))
            return wrapper
        }, {})
    }

    // 将actions的属性全部添加到store中。注意actions属性函数中this的指向。
    function createStoreActions(store, actions) {
        return Object.keys(actions || {}).reduce((wrapper, actionName) => {
            wrapper[actionName] = function () {
                let res;
                const afterList = [];
                const errorList = [];
                subscribeOption.trigger(actionList, {after, onError});
                try {
                    res = actions[actionName].apply(store, arguments);
                } catch (e) {
                    subscribeOption.trigger(errorList, e)
                }
                if (res instanceof Promise) {
                    res.then(r => {
                        return subscribeOption.trigger(afterList, r);
                    }).catch(e => {
                        subscribeOption.trigger(errorList, e)
                        return Promise.reject(e);
                    })
                } else {
                    subscribeOption.trigger(afterList, res);
                }
                return res;

                function after(cb) {
                    afterList.push(cb)
                }

                function onError(cb) {
                    errorList.push(cb)
                }
            }
            return wrapper;
        }, {})
    }

    function setStore(pinia, id, store, result, stateFn) {
        pinia.store.set(id, store);
        store.$id = id;
        stateFn && (result.$reset = createReset(store, stateFn))
        Object.assign(store, result);
        createState(pinia, id);
        runPlugins(pinia, store);
        return store;
    }

    function runPlugins (pinia, store) {
        pinia.plugins.forEach(plugin => {
            const res = plugin({ pinia, store });
            if (res) {
                Object.assign(store, res);
            }
        })
    }

    return useStore
}


