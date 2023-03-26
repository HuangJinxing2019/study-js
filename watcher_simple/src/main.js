import Vue from "../modules/vue";

const vm = new Vue({
  data(){
    return {
      a: 1,
      b: 2,
    }
  },
  computed: {
    total(){
      console.log('computed')
      return this.a + this.b
    }
  },
  watch: {
    a(newValue, oldValue){
      console.log('a改变了：', newValue, oldValue)
    },
    b(newValue, oldValue){
      console.log('b改变了：', newValue, oldValue)
    },
    total(newValue, oldValue){
      console.log('b改变了：', newValue, oldValue)
    }
  }
})
vm.a = 3
console.log(vm.total)
console.log(vm.total)
vm.a = 10
console.log(vm.total)
vm.a = 80
console.log(vm.total)
console.log(vm.total)
console.log(vm.total)


