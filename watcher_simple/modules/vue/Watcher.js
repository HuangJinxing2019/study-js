export default class Watcher{
  constructor() {
    this.watcherData = []
  }
  addWatcher(vm, watcher, key){
    const data = {
      key,
      handle: watcher[key].bind(vm),
    }
    this.addWatcherData(data)
  }
  invoke(key, newValue, oldValue){
    this.watcherData.map(item => item.key === key && item.handle(newValue, oldValue))
  }
  addWatcherData(data){
    this.watcherData.push(data)
  }
}