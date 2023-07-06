export default class ComputedRef{
  constructor(value) {
    this._value = value
  }
  get value(){
    return this._value
  }
  set value(val){
    this._value = val
  }
}