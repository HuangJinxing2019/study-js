<template>
  <div>
    <h2>SetupPinia</h2>
    <p>条数：{{ setupStore.count }}，name：{{ setupStore.name }}</p>
    <input v-model="value"/>
    <button @click="addChange">add</button>
    <button @click="patchHandle">$patch</button>
    <button @click="stateHandle">$state</button>
    <button @click="disposeHandle">$dispose</button>
    <div style="display: flex" v-for="item of setupStore.list" :key="item.id">
      <input type="checkbox" :checked="item.complete" @change="checkBoxChange(item)">
      <p :style="{ textDecoration: item.complete ? 'line-through' : '' }">{{ item.name }}</p>
    </div>
  </div>
</template>

<script setup>
import useSetupStore from "@/store/setupPinia.js";
import {ref} from "vue";

const setupStore = useSetupStore()
const value = ref('')
const addChange = () => {
    setupStore.add({
        id: new Date().getTime(),
        name: value.value,
        complete: false,
    })
    value.value = ''
}
const checkBoxChange = (item) => {
    setupStore.updateStatus(item)
}
setupStore.$subscribe((store, state) => {
    console.log('数据发生改变', store, state)
})

setupStore.$onAction(({after, onError}) => {
    console.log('setupStore执行了action')
    after((resolvedValue) => {
        console.log('setupStore执行完成后', resolvedValue)
    })
    onError((error) => {
        console.log('setupStore执行出错', error)
    })
})
const patchHandle = () => {
    setupStore.$patch({name: {age: 12, eat: '王五'}, h: 1})
}
const stateHandle = () => {
    setupStore.$state.name = '李四'
}
const disposeHandle = () => {
    setupStore.$dispose()
}
</script>

<style lang="scss" scoped>

</style>
