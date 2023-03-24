var Vue = (function (){
    return function (options){
        // 挂载元素节点
        this.$el = document.querySelector(options.el);
        // 挂载数据
        this.$data = options.data();

        // 创建一个盒子容器，装载HTML模板字符串
        var container = document.createElement('div')
        container.innerHTML = options.template;

        // 创建存放v-if/v-show的容器
        var showPool = new Map();
        // 创建存放事件的容器
        var eventPool = new Map();

        Vue.prototype._init = function (container, showPool, eventPool, methods){
            // 初始化数据，将数据设置为响应式
            initData(this, showPool);
            // 收集有绑定v-if/v-show、点击事件的元素
            initPool(container, showPool, eventPool);
            // 为有添加点击@click的元素绑定事件
            bindEvent(this, methods, eventPool);
            // 渲染模板
            render(this, showPool, container);
        }

        this._init(container, showPool, eventPool, options.methods)

        // 初始化数据，将数据设置为响应式
        function initData(vm, showPool){
            var _data = vm.$data;
            for(let key in _data){
                Object.defineProperty(vm, key, {
                    get: function (){
                        return _data[key]
                    },
                    set: function (value){
                        _data[key] = value
                        // 更新元素节点
                        update(vm, key, showPool)
                    }
                })
            }
        }

        // 收集有绑定v-if/v-show、点击事件的元素
        function initPool(container, showPool, eventPool){

            // 获取模板上的所有元素节点
            var allNodes = container.getElementsByTagName('*'),
                itemNode = null;

            //遍历元素节点
            for (var i = 0; i < allNodes.length; i++){
                itemNode = allNodes[i]
                // 获取元素是否是相关属性
                var attrIf = itemNode.getAttribute('v-if'),
                    attrShow = itemNode.getAttribute('v-show'),
                    change = itemNode.getAttribute('@click');

                // 存在v-if 把这个元素和v-if的属性值存放到Map中， key为元素节点， value为type和v-if的属性值
                if(attrIf){
                    showPool.set(itemNode,{
                        type: 'if',
                        prop: attrIf,
                    })
                    itemNode.removeAttribute('v-if')
                }else if(attrShow){
                    // 存在v-show 把这个元素和v-show的属性值存放到Map中， key为元素节点， value为type和v-show的属性值
                    showPool.set(itemNode,{
                        type: 'show',
                        prop: attrShow
                    })
                    itemNode.removeAttribute('v-show')
                }

                // 存在@click 把这个元素和@click的属性值存放到Map中， key为元素节点， value为@click的属性值
                if(change){
                    eventPool.set(itemNode, change)
                    itemNode.removeAttribute('@click')
                }
            };
        }

        // 为有添加点击@click的元素绑定事件
        function bindEvent(vm, methods, eventPool){
            // 遍历收集的事件Map，Map的key为需要绑定的元素节点，value为事件的函数名称
            for (let [ dom, fn ] of eventPool){
                // 将对应methods上的方法挂载到Vue实例上
                vm[fn] = methods[fn]
                //元素绑定事件
                // 注意：需要改变事件的this指向，将this指向为Vue实例
                dom.addEventListener('click', vm[fn].bind(vm), false);
            }
        }
        // 渲染模板
        function render(vm, showPool, container){
            var _data = vm.$data;
            var _el = vm.$el;
            // 遍历收集的有绑定v-if/v-show的元素，根据类型和data的值来设置元素的显示与隐藏
            for (let [ dom, value ] of showPool){
               switch (value.type){
                   case 'if':
                       value.comment = document.createComment('v-if');
                       !_data[value.prop] && dom.parentNode.replaceChild(value.comment, dom);
                       break;
                   case 'show':
                       !_data[value.prop] && (dom.style.display = 'none')
                       break;
                    default :
                       break;
               }
            }
            _el.appendChild(container);
        }

        // 更新元素节点
        function update(vm, key, showPool){
            var _data = vm.$data;

            // 遍历收集的有绑定v-if/v-show的元素，查找相同的key,根据类型和data的值来设置元素的显示与隐藏
            for (let [ dom, value ] of showPool){
                // 查找相同的key
                if(key === value.prop){
                    switch (value.type){
                        case 'if':
                            !_data[key] ? dom.parentNode.replaceChild(value.comment, dom)
                                : value.comment.parentNode.replaceChild(dom, value.comment)
                            break;
                        case 'show':
                            console.log(vm[key] )
                            !_data[key] ?  dom.style.display = 'none' : dom.style.display = ''
                            break;
                        default :
                            break;
                    }
                }
            }
        }
    }

})();
export default Vue;