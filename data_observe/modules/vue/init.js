export function init(vm, options){
    vm.$options = options;
    const data = vm._data = options.data()

}