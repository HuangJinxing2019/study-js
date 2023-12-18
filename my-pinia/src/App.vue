<script setup>
import TodoList1 from './components/TodoList1.vue';
import TodoList2 from './components/TodoList2.vue';
// import { effectScope, ref, computed } from 'vue';
// import useStore1 from './store/todolist1';
// import useStore2 from './store/todolist2';

// const store1 = useStore1();
// const store2 = useStore2();

// console.log(store1, store2);

// const count = ref(0);
// const scope = effectScope();

// let doubleCount;
// let tripleCount;

// const res = scope.run(() => {
//   doubleCount = computed(() => count.value * 2);
  
//   const subScope = effectScope(true);

//   subScope.run(() => {
//     tripleCount = computed(() => count.value * 3);
//   })

//   return {
//     result: count.value
//   }
// });

// function add () {
//   count.value += 1;
// }

// function stop () {
//   scope.stop();
// }

</script>

<template>
  <div>
    <!-- <h1>count: {{ count }}</h1>
    <h2>doubleCount: {{ doubleCount }}</h2>
    <h3>tripleCount: {{  tripleCount  }}</h3>
    <button @click="add">ADD</button>
    <button @click="stop">STOP</button> -->
    <todo-list1></todo-list1>
    <hr>
    <todo-list2></todo-list2>
  </div>
</template>
