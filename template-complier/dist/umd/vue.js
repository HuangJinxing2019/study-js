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
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  //标签名  <my-header></my-header>
  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
  // <my:header></my:header>
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
  // <div
  const startTagOpen = new RegExp(`^<${qnameCapture}`);
  // > />
  const startTagClose = /^\s*(\/?)>/;
  // </div>
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

  /**
   * text 文本信息
   * root 根节点
   * currentParent 父元素节点
   * stack 存储待处理的节点信息
   * 拿到html字符串
   * 判断字符串的<号是否在第0位
   * 0；是以<开始，可能是开始标签，也可能是结束标签
   *    开始标签： 正则匹配是开始标签，匹配成功。
   *             创建开始标签信息
   *             检查root是否为空，如果是空，将节点信息赋值给root
   *             循环提取标签属性信息
   *             返回元素节点信息
   *             将元素节点信息push到stack中保存
   *             continue进入下一次循环
   *    结束标签：将stack之后一个节点信息移出，
   *            设置移出的节点信息的parent为移出后stack的最后一项的节点
   *            移除的节点并添加到移出后stack的最后一项的节点children内
   *            continue进入下一次循环
   *!0：文本内容：提取文本内容。0~<好的位置
   *    得到文本内容，创建文本节点信息
   *    将节点信息添加到currentParent的children内
   */

  function parseHtmlToAst(html) {
    let text,
      root,
      currentParent,
      stack = [];
    while (html) {
      let textEnd = html.indexOf('<');
      if (textEnd === 0) {
        const startTagMatch = parseStartTag();
        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }
        // 匹配结束标签
        const endTagMatch = html.match(endTag);
        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }
      if (textEnd > 0) {
        text = html.substring(0, textEnd);
      }
      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    /**
     * 提取开始标签的信息及标签属性
     * <div id="app" v-if=”show“ style="width: 100%">
     * 返回信息格式： {
     *     tag: 'div',
     *     attrs: [
     *        { name: 'id', value: 'app' },
     *        { name: 'v-if', value: 'show' },
     *        { name: 'style', value: 'width: 100%' },
     *     ]
     * }
     */
    function parseStartTag() {
      // 匹配开始标签
      const start = html.match(startTagOpen);
      let end, attr;
      // 开始标签是否存在
      if (start) {
        // 保存标签名称
        const match = {
          tagName: start[1],
          attrs: []
        };
        // 删除已匹配的标签字符
        advance(start[0].length);
        // 开始获取标签的属性
        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          // 删除已匹配的标签属性
          advance(attr[0].length);
        }
        // 匹配到了结束>符合，返回信息
        if (end) {
          advance(end[0].length);
          return match;
        }
      }
    }
    function advance(n) {
      html = html.substring(n);
    }

    // 创建开始标签节点信息，并将节点添加到stack中
    function start(tagName, attrs) {
      const element = createASTElement(tagName, attrs);
      if (!root) {
        root = element;
      }
      currentParent = element;
      stack.push(element);
    }

    // 结束标签
    function end(tagName) {
      const element = stack.pop();
      // 更新当前元素的parent
      currentParent = stack[stack.length - 1];
      if (currentParent) {
        // 设置取出元素的父亲
        element.parent = currentParent;
        // 元素添加父级的children
        currentParent.children.push(element);
      }
    }

    // 文本信息
    function chars(text) {
      text = text.trim();
      if (text) {
        currentParent.children.push({
          type: 3,
          text
        });
      }
    }

    // 创建节点信息
    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        type: 1,
        attrs,
        children: [],
        parent: null
      };
    }
    return root;
  }

  const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  function generate(ast) {
    const children = generateChildren(ast.children);
    const code = `_c("${ast.tag}", ${formatAttrs(ast.attrs)}, ${children})`;
    return code;
  }

  // 获取文本
  function getTextNode(text) {
    if (defaultTagRE.test(text)) {
      let match,
        index,
        lastIndex = defaultTagRE.lastIndex = 0,
        textArr = [];
      while (match = defaultTagRE.exec(text)) {
        index = match.index;
        if (index > lastIndex) {
          textArr.push(`"${text.substring(lastIndex, index)}"`);
        }
        textArr.push(`_s(${match[1].trim()})`);
        lastIndex = index + match[0].length;
      }
      if (lastIndex < text.length) {
        textArr.push(`"${text.substring(lastIndex)}"`);
      }
      return textArr.join('+');
    } else {
      return `"${text}"`;
    }
  }

  // 获取节点子元素标签
  function generateChildren(children) {
    if (children && children.length > 0) {
      const list = children.map(child => {
        if (child.type === 1) {
          child = generate(child);
        } else if (child.type === 3) {
          child = `_v(${getTextNode(child.text)})`;
        }
        return child;
      });
      return list.join(',');
    }
  }

  // 格式化变迁属性->对象类型
  function formatAttrs(attrs) {
    let attrObj = {};
    for (let item of attrs) {
      // "width: 100px; background: green"
      if (item.name === 'style') {
        let styleObj = {};
        const styleList = item.value.split(';').map(item => item.split(':'));
        for (let [key, value] of styleList) {
          styleObj[key] = value;
        }
        attrObj[item.name] = styleObj;
      } else {
        attrObj[item.name] = item.value;
      }
    }
    return JSON.stringify(attrObj);
  }

  function compilerToRenderFunction(html) {
    const ast = parseHtmlToAst(html),
      code = generate(ast),
      render = new Function(`
            with(this){ return ${code} }
          `);
    return render;
  }

  function patch(oldNode, vnode) {
    let el = createElement(vnode),
      parentElement = oldNode.parentElement;
    parentElement.insertBefore(el, oldNode.nextSibling);
    parentElement.removeChild(oldNode);
  }
  function createElement(vnode) {
    const {
      tag,
      props,
      children,
      text
    } = vnode;
    if (typeof tag === 'string') {
      vnode.el = document.createElement(tag);
      updateProps(vnode);
      children.map(child => {
        vnode.el.appendChild(createElement(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }
    return vnode.el;
  }
  function updateProps(vnode) {
    const el = vnode.el,
      newProps = vnode.props || {};
    for (let key in newProps) {
      if (key === 'style') {
        console.log(newProps.style);
        for (let sKey in newProps.style) {
          el.style[sKey] = newProps.style[sKey];
        }
      } else if (key === 'class') {
        el.className = newProps[key];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function mountComponent(vm) {
    vm._update(vm._render());
  }
  function lifeCycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      const vm = this;
      patch(vm.$el, vnode);
    };
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      const vm = this;
      vm.$options = options;
      initState(vm);
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
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
      mountComponent(vm);
    };
  }

  function createElement$1(tag, attrs = {}, ...children) {
    return vnode(tag, attrs, children);
  }
  function createTextVnode(text) {
    return vnode(undefined, undefined, undefined, text);
  }
  function vnode(tag, props, children, text) {
    return {
      tag,
      props,
      children,
      text
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._render = function () {
      const vm = this,
        render = vm.$options.render,
        vnode = render.call(vm);
      return vnode;
    };
    Vue.prototype._v = function (text) {
      return createTextVnode(text);
    };
    Vue.prototype._s = function (value) {
      if (value === null) return;
      return value;
    };
    Vue.prototype._c = function () {
      return createElement$1(...arguments);
    };
  }

  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue);
  lifeCycleMixin(Vue);
  renderMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
