
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
        useReactive(this);
        initComputed(this, this.$computed)
        render(this, container)
    }

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
                        update(vm, key)
                        updateComputed(vm, key, function (_key){
                            update(vm, _key)
                        })
                    }
                })
            })(key);
        }
    }

    function initComputed(vm, computed){
        _compilerComputed(vm, computed)
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
        var allNodes = container.getElementsByTagName('*'),
          itemNode = null;
        for (var i = 0; i < allNodes.length; i++){
            itemNode = allNodes[i]
            var macth = itemNode.textContent.match(data_reg);
            if(macth){
                itemNode.textContent = itemNode.textContent.replace(data_reg, function (node, key){
                    dataPool.set(itemNode, key)
                    return vm[key]
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
        for(var k in computedData) {
            if(computedData[k].dep.indexOf(key) !== -1){
                vm[k] = computedData[k].get()
                cb(k)
            }
        }
    }

    function _compilerComputed(vm, computed){
        for (var key in computed){
            var descriptor = Object.getOwnPropertyDescriptor(computed, key);
            var descriptorFn = descriptor.value.get ? computed.value.get : descriptor.value;
            computedData[key] = {};
            computedData[key].value = descriptorFn.call(vm);
            computedData[key].get = descriptorFn.bind(vm);
            console.log( _collectDep(computedData[key].get))
            computedData[key].dep = _collectDep(descriptorFn)
        }
    }

    function _collectDep(fn){
        var list = fn.toString().match(prop_reg);
        return list ? list.map(item => item.split('.')[1]) : []
    }
    return Vue
})();



export default Vue