import {mergeObject, subscribeOption} from "@/pinia/utils.js";
import {watch} from "vue";

export function createPatch (pinia, id){
    return function $patch(stateOrFn){
        if(typeof stateOrFn === 'function'){
            stateOrFn(pinia.state.value[id]);
        } else {
            mergeObject(pinia.state.value[id], stateOrFn)
        }
    }
}

export function createSubscribe(pinia, id, scope){
    return function $subscribe (cb, options = {}){
        scope.run(() => watch(pinia.state.value[id], state => {
            cb({ storeId: id }, state);
        }, options))
    }
}

export function createReset(store, stateFn){
    return function $reset() {
        const initialState = stateFn ? stateFn() : {}
        store.$patch(state => {
            Object.assign(state, initialState)
        })
    }
}

export function createState (pinia, id) {
    const store = pinia.store.get(id);
    Object.defineProperty(store, '$state', {
        get () {
            return pinia.state.value[id];
        },
        set (newState) {
            store.$patch(state => Object.assign(state, newState));
        }
    })
}

export function createOnAction(actionList){
    return function $onAction(cb){
        subscribeOption.add(actionList, cb)
    }
}

