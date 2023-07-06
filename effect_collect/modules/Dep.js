export default class Dep {
  constructor() {
    // 收集effectWatch、watch、computed依赖集合
    this.effectMap = new WeakMap();
  }

  // 临时缓存effectWatch、watch、computed回调函数
  static callback;
  // 收集依赖 { target: Map: { key: Set[callback] } }
  collect(target, key){
    let map = this.effectMap.get(target);
    if(!map){
      map = new Map();
      this.effectMap.set(target, map);
    }
    let set = map.get(key);
    if(!set){
      set = new Set();
      map.set(key, set)
    }
    if(Dep.callback){
      set.add(Dep.callback)
    }
  }

  notify(target, key, newVal,oldVal){
    const deps = this.effectMap.get(target).get(key);
    for(let dep of deps){
      if(typeof dep === 'function'){
        const value = dep(newVal, oldVal)
        if(dep.computedRef){
          dep.computedRef.value = value
        }
      }else {

      }
    }
  }
}