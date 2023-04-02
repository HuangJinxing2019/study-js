(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function defineReactive(target, key, value) {
    observe(value);
    Object.defineProperty(target, key, {
      get() {
        console.log('获取属性key:' + key + ' 值为：' + value);
        return value;
      },
      set(val) {
        console.log('设置属性key:' + key + ' 值为：' + val);
        observe(val);
        value = val;
      }
    });
  }

  function observeArray(arr) {
    for (let item of arr) {
      observe(item);
    }
  }

  function Observer(data) {
    if (Array.isArray(data)) {
      observeArray(data);
      data.__proto__ = arrMethods;
    } else {
      this.walk(data);
    }
  }
  Observer.prototype.walk = function (data) {
    for (let key in data) {
      if (Object.hasOwn(data, key)) {
        defineReactive(data, key, data[key]);
      }
    }
  };

  function observe(data) {
    if (typeof data !== 'object' || data === null) return;
    new Observer(data);
  }

  const arrPrototype = Array.prototype,
    arrMethods = Object.create(arrPrototype);
  let arrProto = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'];
  arrProto.map(m => {
    arrMethods[m] = function () {
      console.log('拦截了数组的方法');
      const args = Array.prototype.slice.call(arguments),
        rt = arrPrototype[m].apply(this, args);
      let newArr;
      switch (m) {
        case 'push':
        case 'shift':
          newArr = args;
          break;
        case 'splice':
          newArr = args.slice(2);
          break;
      }
      if (newArr) observeArray(newArr);
      return rt;
    };
  });

  function proxy(target, sourceKey, key) {
    Object.defineProperty(target, key, {
      get() {
        return target[sourceKey][key];
      },
      set(val) {
        if (target[sourceKey][key] === val) return;
        target[sourceKey][key] = val;
      }
    });
  }
  function setConstantProperty(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value
    });
  }
  function isArray(value) {
    return Array.isArray(value);
  }

  const isObject = function (data) {
    return typeof data === 'object' && data !== null;
  };

  const arrPrototype$1 = Array.prototype,
    arrMethods$1 = Object.create(arrPrototype$1);
  const arrProtoMethods = ['push', 'pop', 'shift', 'unshift', 'sort', 'splice', 'reverse'];
  arrProtoMethods.map(m => {
    arrMethods$1[m] = function (...args) {
      const result = arrPrototype$1[m].apply(this, args),
        ob = this.__ob__;
      let newArr;
      switch (m) {
        case 'push':
        case 'unshift':
          console.log(`数组方法拦截push/unshift：${args}`);
          newArr = args;
          break;
        case 'splice':
          console.log(`数组方法拦截slice：${args}`);
          newArr = args.slice(2);
          break;
      }
      if (newArr) ob.observeArr(newArr);
      return result;
    };
  });

  class Observer$1 {
    constructor(data) {
      setConstantProperty(data, '__ob__', this);
      if (isArray(data)) {
        data.__proto__ = arrMethods$1;
        this.observeArr(data);
      } else {
        this.walk(data);
      }
    }
    walk(data) {
      const keys = Object.keys(data);
      for (let key of keys) {
        defineReactive$1(data, key, data[key]);
      }
    }
    observeArr(arr) {
      for (let item of arr) {
        observe$1(item);
      }
    }
  }
  function defineReactive$1(target, key, value) {
    observe$1(value);
    Object.defineProperty(target, key, {
      get() {
        console.log(`数据获取${key} value: ${value}`);
        return value;
      },
      set(newValue) {
        if (newValue === value) return;
        console.log(`数据设置${key} value: ${newValue}`);
        observe$1(newValue);
        value = newValue;
      }
    });
  }
  function observe$1(data) {
    if (!isObject(data) || data.__ob__) return data;
    new Observer$1(data);
  }

  function initState(vm) {
    const options = vm.$options;
    if (options.data) {
      initData(vm);
    }
  }
  function initData(vm) {
    let data = vm.$options.data;
    vm._data = data = typeof data === 'function' ? data.call(vm) : data;
    for (let key in data) {
      if (Object.hasOwn(data, key)) {
        proxy(vm, '_data', key);
      }
    }
    observe$1(data);
  }

  // id="app" id='app' id=app
  function parseHtmlToAst(html) {
    console.log(html);
    return html;
  }

  function compilerToRenderFunction(html) {
    const ast = parseHtmlToAst(html);
    return ast;
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      vm.$options = options;
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
      initState(vm);
    };
    Vue.prototype.$mount = function (el) {
      const vm = this,
        options = vm.$options;
      vm.$el = document.querySelector(el);
      if (!options.render) {
        let template = options.template;
        if (!template && el) {
          template = vm.$el.outerHTML;
        }
        const render = compilerToRenderFunction(template);
        options.render = render;
      }
    };
  }

  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
