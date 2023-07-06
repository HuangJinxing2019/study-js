import Dep from "./Dep";
import ComputedRef from "./ComputedRef";
export function watchEffect(callback){
  Dep.callback = callback;
  callback();
  Dep.callback = null;
}
export function watch(propFn, callback){
  Dep.callback = callback;
  if(typeof propFn === 'function') propFn();
  Dep.callback = null;
}

export function computed(callback){
  Dep.callback = callback;
  const value = callback()
  const computedRef = new ComputedRef(value);
  // 将计算结果挂在回调函数的属性上，依赖发生改变时在notify需要获取这个对象进行修改为重新计算后的值。
  Object.defineProperty(callback, 'computedRef', {
    value: computedRef
  })
  Dep.callback = null;
  return computedRef;
}