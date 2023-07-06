export default class Observer{
    constructor() {
        this.observers = []
    }
    add(fn){
        if(typeof fn === 'function'){
            this.observers.push(fn)
        }else {
            throw new Error('传入的不是一个函数')
        }
    }
    notify(...arg){
        this.observers.forEach((fn) => {
            fn(...arg)
        })
    }
}
