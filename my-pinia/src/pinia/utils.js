import {isRef} from "vue";

export const PINIA_SYMBOL = Symbol();

export function getArgs(args){
    let id, options, setup;
    if (isString(args[0])){
        id = args[0]
        if(isFunction(args[1])){
            setup = args[1]
        } else {
          options = args[1]
        }
    } else {
        options = args[0];
        id = options.id;
    }
    return {
        id,
        options,
        setup,
    }
}

export function isString(val) {
    return typeof val === 'string'
}
export function isFunction(val) {
    return typeof val === 'function'
}

export function isComputed(val){
    return !!(isRef(val) && val.effect);
}

export function isObject(val){
    return typeof val === 'object' && val !== null;
}

export function mergeObject(targetState, newState){
    for (let k in newState) {
        const oldVal = targetState[k];
        const newVal = newState[k];
        if (isObject(oldVal) && isObject(newVal)) {
            targetState[k] = mergeObject(oldVal, newVal);
        } else {
            targetState[k] = newVal;
        }
    }
    return targetState;
}

export const subscribeOption = {
    add (list, cb){
        list.push(cb)
    },
    trigger(list, ...args) {
        list.forEach(cb => cb(...args));
    }
}
