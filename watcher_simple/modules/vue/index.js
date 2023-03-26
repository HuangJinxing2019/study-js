import {reactive} from "./reactive";
import Computed from "./Computed";
import Watcher from "./Watcher";

class Vue{
  constructor(options) {
    const { data, computed, watch } = options
    this.$data = data()
    this.init(computed, watch)
  }
  init(computed, watch) {
    reactive(this, (key, value) => {
      // 数据获取的回调函数
    }, (key, newValue, oldValue) => {
      // 数据设置值的回调函数
      if(newValue === oldValue){
        return
      }
      // 执行computedIns的update方法，找到对应的key，重新计算得出最新的值
      this.$computed(key, (key, newValue, oldValue) => {
        // 执行watcherIns的invoke方法，找到对应的key，执行函数
        this.$watch(key, newValue, oldValue)
      })
    })

    const computedIns = this.initComputed(this, computed);
    const watcherIns = this.initWatcher(this, watch);

    // 将computedIns实例的update方法挂载到vm上，this指向要绑定computedIns实例, 这样update方法才能取到实例上的computedData的数据
    this.$computed = computedIns.update.bind(computedIns);

    // 将watcherIns实例的invoke方法挂载到vm上，this指向要绑定watcherIns实例, 这样update方法才能取到实例上的watcherData的数据
    this.$watch = watcherIns.invoke.bind(watcherIns)
  }
  initComputed(vm, computed){
    // 创建一个Computed的实例对象，并返回，
    // computedIns收集了所有计算属性的结果，方法，依赖：computedData[]，更新计算属性值的方法update
    const computedIns = new Computed();
    for (let key in computed){
      // 传入vm 是将key属性和计算结果挂载到vm的实例上，执行时也需要将this指向vm实例
      computedIns.addComputed(vm, computed, key)
    }
    return computedIns
  }
  initWatcher(vm, watcher){
    // 创建一个Watcher的实例对象，并返回
    // watcherIns收集了所有侦听的属性和方法，执行属性方法的invoke函数
    const watcherIns = new Watcher();
    for(let key in watcher){
      // 传入vm 是用于改变属性方法执行的this指向
      watcherIns.addWatcher(vm, watcher, key)
    }
    return watcherIns
  }
}
export default Vue