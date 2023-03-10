
function _defineProperties(target, props){
  for(var i = 0; i < props.length; i++){
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = false
    if("value" in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function createClass(Constructor, prototypeFn, staticFn){
  if(prototypeFn) _defineProperties(Constructor.prototype, prototypeFn)
  if(staticFn) _defineProperties(Constructor, staticFn)
  return Constructor
}

function checkInstance (Constructor, instance) {
  if(instance instanceof Constructor){
    return true
  }else{
    throw new Error('请通过new创建实例对象')
  }
}

var Person = (function (){
  return function Person(){
    this.name = arguments.length > 0 && arguments[0] ? arguments[0] : undefined;
    this.age = arguments.length > 1 && arguments[1] ? arguments[1] : undefined;

    checkInstance(Person, this)

    createClass(Person, [
      {
        key: 'say',
        value: function(){
          console.log('say hi')
        }
      }
    ], [
      {
        key: 'eat',
        value: function (){
          console.log('eat')
        }
      }
    ])
  }
})();
const person = new Person('张三', 18)
console.log(Person.eat())