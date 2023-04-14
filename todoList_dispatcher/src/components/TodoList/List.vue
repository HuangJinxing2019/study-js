<template>
  <ul>
    <todo-item
        v-for="item of todoData"
        :key="item.id"
        :item-data="item"
        @completeChange="completeChange"
        @deleteChange="deleteChange"
    />
  </ul>
</template>

<script>
import TodoItem from "./TodoItem.vue";
export default {
  name: "List",
  components: {
    TodoItem
  },
  props: {
    todoData: Array,
  },
  methods: {
    completeChange(...args){
      this.$emit('dispatcher', ...args)
    },
    deleteChange(...args){
      this.$emit('dispatcher', ...args)
    },
  }
}
</script>

<style scoped>

</style>