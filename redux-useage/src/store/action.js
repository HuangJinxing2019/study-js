/**
 * ADD_TODO
 * REMOVE_TODO
 * TOGGLE_TODO
 * 
 * dispatch(addTodo());
 */

import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "./actionType"

export function addTodo (todo) {
  // todo async task

  return {
    type: ADD_TODO,
    payload: todo
  }
}

export function removeTodo (id) {
  return {
    type: REMOVE_TODO,
    payload: id
  }
}

export function toggleTodo (id) {
  return {
    type: TOGGLE_TODO,
    payload: id
  }
}