import { watch, watchEffect, computed } from "../modules/effect";
import { reactive } from "../modules/reactive";

const state = reactive({
  a: 1,
  b: {
    c: 3
  }
})
watch(() => state.a, (newVal, oldVal) => {
  console.log('执行了watch侦听回调：state.a', newVal, oldVal)
})
watchEffect(()=>{
  const res = state.a + state.b.c
  console.log('执行了watchEffect回调：', res)
})

const count = computed(() => {
  console.log('执行了computed回调：')
  return state.a + state.b.c
})


setTimeout(() => {
  state.a = 100
  state.b.c = 1000
  console.log(count.value)
}, 2000)
setTimeout(() => {
  state.a = 1000
  state.b.c = 10000
  console.log(count.value)
}, 4000)