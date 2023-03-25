
// el: '#app',
//     template: `
//         <div>{{a}}</div>
//         <div>+</div>
//         <div>{{b}}</div>
//         <div>=</div>
//         <div>{{total}}</div>
//     `,
//     data(){
//     return {
//         a: 1,
//         b: 2,
//     }
// },
// computed: {
//     total(){
//         return this.a + this.b
//     }
// }


var prop_reg = /this.(.+?)/g
var data_reg = /\{\{(.+?)\}\}/g

var Vue = (function () {
    var computedData = {}
    var dataPool = new Map();
    function Vue (options){
        this.$el = document.querySelector(options.el)
        this.$data = options.data();
        this.$computed = options.computed;
        var container = document.createElement('div');
        container.innerHTML = options.template;
        this._init(container);
    }
    Vue.prototype._init = function(container){
        // 添加数据响应式
        useReactive(this);
        // 将执行computed上的属性方法，收集属性和属性描述，将属性和属性值挂载到实例vm上
        initComputed(this, this.$computed)
        // 渲染模板
        render(this, container)
    }

    // 数据响应式
    function useReactive(vm){
        var _data = vm.$data;
        for(var key in _data){
            (function (key){
                Object.defineProperty(vm, key, {
                    get(){
                        return _data[key]
                    },
                    set(value) {
                        _data[key] = value
                        // 数据改变，更新页面数据
                        update(vm, key)
                        // computed属性值更新
                        updateComputed(vm, key, function (_key){
                            // 更新完毕之后的回调，更新页面
                            update(vm, _key)
                        })
                    }
                })
            })(key);
        }
    }

    // 遍历computed，将属性挂载到vm实例上
    function initComputed(vm, computed){
        // 编译computed, 收集属性及属性描述
        _compilerComputed(vm, computed)
        // 遍历收集的属性，将属性和值挂载到vm实例上
        for (var key in computedData){
            (function (key){
                Object.defineProperty(vm, key, {
                    get (){
                        return computedData[key].value
                    },
                    set(value) {
                        computedData[key].value = value
                    }
                })
            })(key)
        }
    }

    function render(vm, container){
        compilerTemplate(vm, container)
        vm.$el.appendChild(container)
    }

    function compilerTemplate(vm, container){
        // 获取模板中的所有元素节点
        var allNodes = container.getElementsByTagName('*'),
          itemNode = null;
        // 遍历元素节点
        for (var i = 0; i < allNodes.length; i++){
            itemNode = allNodes[i]
            // 判断元素节点里的内容是否有{{}}是字符串
            var macth = itemNode.textContent.match(data_reg);
            if(macth){
                // 如果有，就替换对应的值，并收集元素节点和对应的key
                itemNode.textContent = itemNode.textContent.replace(data_reg, function (node, key){
                    dataPool.set(itemNode, key.trim())
                    return vm[key.trim()]
                })
            }
        }
    }

    function update(vm, key){
        for(let [ dom, value ] of dataPool){
            if(key === value){
                dom.textContent = vm[key]
            }
        }
    }

    function updateComputed(vm, key, cb){
        var _dep = null
        for(var k in computedData) {
            _dep = computedData[k];
            // 查找的dep中是否有与key相同的值，如果有就重新执行以下get函数，更新vm上key属性的值并执行回调更新页面
            for(var i = 0; i < _dep.length; i++){
                if(_dep[i] === key){
                    vm[k] = computedData[k].get()
                    cb(k)
                }
            }
        }
    }

    function _compilerComputed(vm, computed){
        // 遍历computed对象
        for (var key in computed){
            // 获取属性描述
            var descriptor = Object.getOwnPropertyDescriptor(computed, key);
            // 获取属性方法，value可能是value: { get(){} }, 也可能是value(){}形式
            var descriptorFn = descriptor.value.get ? computed.value.get : descriptor.value;
            computedData[key] = {};
            // 执行得到结果
            computedData[key].value = descriptorFn.call(vm);
            // 将方法保存
            computedData[key].get = descriptorFn.bind(vm);
            // 获取函数内部的使用的key
            computedData[key].dep = _collectDep(descriptorFn)
        }
    }

    function _collectDep(fn){
        // 将函数转为字符串，正则匹配 this.a, this.b 的字符
        var list = fn.toString().match(prop_reg);
        // 将a， b key取出并返回
        return list ? list.map(item => item.split('.')[1]) : []
    }
    return Vue
})();

export default Vue