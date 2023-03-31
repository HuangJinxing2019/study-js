import { initState } from "./state";

export function init(vm, options){
    vm.$options = options;
    initState(vm)
}