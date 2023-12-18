import { defineStore } from '../pinia';
// import { defineStore } from 'pinia';// 

export default defineStore('todolist1', { // function useStore() {}
  state: () => ({
    todoList: []
  }),
  getters: { // computed   const count = computed(() => this.todoList.length)
    count () {
      return this.todoList.length;
    }
  },
  actions: {
    /**
     * {
     *   id: Timestamp
     *   content: string
     *   completed: boolean
     * }
     * 
     * this => this -> store
     */
    addTodo (todo) {
      this.todoList.unshift(todo);
    },
    toggleTodo (id) {
      this.todoList = this.todoList.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }

        return todo;
      })
    },
    removeTodo (id) {
      this.todoList = this.todoList.filter(todo => todo.id !== id);
    }
  }
});