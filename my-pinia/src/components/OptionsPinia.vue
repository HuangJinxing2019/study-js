<template>
  <div>
    <h2>OptionsPinia</h2>
    <p>条数：{{ optionStore.count }}，name：{{ optionStore.name }}</p>
    <input v-model="value"/>
    <button @click="addChange">add</button>
    <button @click="patchHandle">$patch</button>
    <button @click="resetHandle">$reset</button>
    <button @click="stateHandle">$state</button>
    <button @click="disposeHandle">$dispose</button>
    <div style="display: flex" v-for="item of optionStore.list" :key="item.id">
      <input type="checkbox" :checked="item.complete" @change="checkBoxChange(item)">
      <p :style="{ textDecoration: item.complete ? 'line-through' : '' }">{{ item.name }}</p>
    </div>
  </div>
</template>

<script setup>
import useOptionStore from "@/store/optionPinia.js";
import {ref} from "vue";

const value = ref('')
const optionStore = useOptionStore();
const addChange = () => {
    optionStore.add({
        id: new Date().getTime(),
        name: value.value,
        complete: false,
    })
    value.value = ''
}
optionStore.$subscribe((store, state) => {
    console.log('数据发生改变', store, state)
})

optionStore.$onAction(({after, onError}) => {
    console.log('optionStore执行了action')
    after((resolvedValue) => {
      console.log('optionStore执行完成后', resolvedValue)
    })
    onError((error) => {
      console.log('optionStore执行出错', error)
    })
})
const checkBoxChange = (item) => {
    optionStore.updateStatus(item)
}
const patchHandle = () => {
    optionStore.$patch({name: {age: 12, eat: '王五'}, h: 1})
}
const resetHandle = () => {
    optionStore.$reset()
}
const stateHandle = () => {
    optionStore.$state.name = '李四'
}
const disposeHandle = () => {
    optionStore.$dispose()
}
</script>

<style lang="scss" scoped>

</style>
