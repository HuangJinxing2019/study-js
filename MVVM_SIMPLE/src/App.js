import { createApp } from "../MVVM";
import {useReactive} from "../MVVM/reactive";
function App(){
  const state = useReactive({
    count: 0,
    a: {b: 1},
    name: '张三'
  })
  const add = (num) => {
    state.count += num;
  }
  const minus = (num = 1) => {
    state.count -= num
  }
  const changeName = (name) => {
    state.name = name
  }
  return {
    template: `
      <h1>{{count}}</h1>
      <h2>{{name}}</h2>
      <h2>{{ a.b }}</h2>
      <button onClick="add(2)">+</button>
      <button onClick="minus(1)">-</button>
      <button onClick="changeName('李四')">click change name</button>
    `,
    state,
    methods: {
      add,
      minus,
      changeName,
    },
    el: document.querySelector('#app')
  }
}
createApp(App());