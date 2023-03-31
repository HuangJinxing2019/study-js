import Vue from "../modules/vue";

const vm = new Vue({
  data(){
    return {
      name: '张三',
      age: 18,
      classes: [
        '语文',
        '数学',
        '英语'
      ],
      a: {
        b: 2,
        c: {
          d: 5,
          e: [
            1,
            2,
            3,
            {
              f: 8,
              g: [7, 8]
            }
          ]
        }
      },
      s: [{h: 8}, {j: 0}]
    }
  },
})
console.log(vm.classes.push('地理'))
console.log(vm.a.c.e.splice(0, 0, [1, 2, 3, 5]))
console.log(vm.a.c.e[0].push('909090'))
console.log(vm.s[0].h)
