<template>
  <div>
    <t-d-title :title="title"></t-d-title>
    <t-d-form @dispatcher="dispatcher"></t-d-form>
    <t-d-list :todo-data="todoList" @dispatcher="dispatcher"></t-d-list>
  </div>
</template>

<script>
import TDTitle from './Title.vue'
import TDForm from "./Form.vue";
import TDList from "./List.vue";
import todoDispatcher from "../dispatchers/todoDispatcher";
export default {
  name: "TodoList",
  components: {
    TDTitle,
    TDForm,
    TDList
  },
  data(){
    return {
      title: 'to do title',
      todoList: [],
    }
  },
  methods:{
    dispatcher(...args){
      todoDispatcher(this)(...args)
    }
  }
}
</script>

<style scoped>

</style>