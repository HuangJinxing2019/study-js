
/**
 * options
 * id, options,
 * id, setup
 */

import { computed, effectScope, inject, isReactive, isRef, reactive } from "vue";
import { piniaSymbol } from "./global";
import { getArgs, isComputed, isFunction } from "./utils";

export default function defineStore (...args) {
  const {
    id,
    options,
    setup
  } = getArgs(args);

  const isSetup = isFunction(setup);
  
  /**
   * 1. pinia导入
   * 2. 判断pinia.store => id
   *    没有 => 创建store
   *    有 => 返回
   */
  function useStore () { // 创建store
    const pinia = inject(piniaSymbol);

    if (!pinia.store.has(id)) {
      if (isSetup) {
        /**
         * pinia.store => id => store(setup)
         */
        createSetupStore(pinia, id, setup);
      } else {
        createOptionStore(pinia, id, options);
      }
    }
    
    // store => Map => get set has
    return pinia.store.get(id);
  }

  return useStore;
}

/**{
 *   state,
 *   store,
 *   scope,
 *   install
 * } */
function createSetupStore (pinia, id, setup) {
  const setupStore = setup();
  /**
   * pinia APIs
   * count
   * todoList
   * addTodo
   * removeTodo,
   * toggleTodo
   */
  const store = reactive({});
  let storeScope;

  const result = pinia.scope.run(() => {
    storeScope = effectScope();
    return storeScope.run(() => compileSetup(pinia, id, setupStore));
  });

  return setStore(pinia, id, store, result);
}

function compileSetup (pinia, id, setupStore) {
  !pinia.state.value[id] && (pinia.state.value[id] = {});
  

  // ref  reactive   computedx  methods x
  for (let key in setupStore) {
    const el = setupStore[key];

    if ((isRef(el) && !isComputed(el)) || isReactive(el)) {
      /**
       * pinia {
       *   state: {
       *     "todolist1": {
       *       todoList: []
       *     }
       *   }
       * }
       */
      pinia.state.value[id][key] = el;
    }
  }

  return {
    /**
     * count,
     * todoList
     * addTodo,
     * removeTodo,
     * toggleTodo
     */
    ...setupStore
  }
}

// ----------------------------------------

function createOptionStore (pinia, id, options) {
  const {
    state,
    getters,
    actions
  } = options;

  const store = reactive({});
  let storeScope;

  const result = pinia.scope.run(() => {
    storeScope = effectScope();

    return storeScope.run(() => compileOptions(pinia, id, store, {
      state,
      getters,
      actions
    }))
  });

  return setStore(pinia, id, store, result);
}

function compileOptions(pinia, id, store, {
  state,
  getters,
  actions
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

function createStoreState (pinia, id, state) {
  return pinia.state.value[id] = state ? state() : {};
}

function createStoreGetters (store, getters) {
  /**
   * getters: {
   *   count () {
   *    // this => store
   *     return this.todoList.length
   *   }
   * }
   */
  // [ count, count1, ]

  /**
   * {
   *   count: computed(() => getters.count.call(store))
   * }
   */
  return Object.keys(getters || {}).reduce((wrapper, getterName) => {
    wrapper[getterName] = computed(() => getters[getterName].call(store));
    return wrapper;
  }, {});
}

function createStoreActions (store, actions) {
  return Object.keys(actions || {}).reduce((wrapper, actionName) => {
    wrapper[actionName] = function () {
      actions[actionName].apply(store, arguments);
    }
    return wrapper;
  }, {});
}

// -------------------------------

function setStore (pinia, id, store, result) {
  pinia.store.set(id, store);
  Object.assign(store, result);
  return store;
}