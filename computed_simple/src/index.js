import Vue from "../modules/Vue";

const vm = new Vue({
    el: '#app',
    template: `
        <span>{{a}}</span>
        <span>+</span>
        <span>{{b}}</span>
        <span>=</span>
        <span>{{total}}</span>
    `,
    data(){
        return {
            a: 1,
            b: 2,
        }
    },
    computed: {
        total(){
            return this.a + this.b
        }
    }
})
console.log(vm)
vm.a = 10