import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actionType';
import initialState from './state';

export default function (state = initialState, action = {}) {
  /**
   * state => 为了操作
   * action => type => 怎么操作
   *           payload => 操作的时候需要什么参数
   */
  const { type, payload } = action;

  switch (type) {
    case ADD_TODO:
      return addTodo(state, payload);
    case REMOVE_TODO:
      return removeTodo(state, payload);
    case TOGGLE_TODO:
      return toggleTodo(state, payload);
    default:
      return state; 
  }
}

/**
 * flux的数据操作原则是：返回一个新的state引用
 */
function addTodo (state, todo) {
  state.todoList = [ ...state.todoList, todo ];
  return {
    todoList: state.todoList
  }
}

function removeTodo (state, id) {
  state.todoList = state.todoList.filter(todo => todo.id != id);
  return {
    todoList: state.todoList
  }
}

function toggleTodo (state, id) {
  state.todoList = state.todoList.map(todo => {
    if (todo.id == id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });

  return {
    todoList: state.todoList
  }
}