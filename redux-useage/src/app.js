import store from './store';
import { addTodo } from './store/action';
import render from './render/todo';
/**
 * {
 *   subscribe
 *   getState
 *   dispatch
 * }
 */

// state => 发生了变化 => setter劫持 => cb
// store.subscribe(() => {
//   console.log(123);
// });

// store.subscribe(() => {
//   console.log(234);
// })

const oTodoInput = document.querySelector('#todoInput');
const oAddBtn = document.querySelector('#addBtn');
const oList = document.querySelector('#list');
const todoTemp = document.querySelector('#todoTemplate').innerHTML;

/**
 * 1. 没有remove  toggle的能力
 * 视图 => todoList 渲染
 * 
 * 2. 数据是更改了，视图怎么更改? 视图的操作方式是不一样的
 *    add  remove  toggle
 * 
 * => 外挂思想
 *  subscribe => cb state只要变化了，cb就执行
 *  不知道数据是怎么操作后得到的新的state
 *  
 *  todoList_old
 *  todoList_new
 * 
 */

const init = () => {
  bindEvent();
}
store.subscribe(() => {
  render(store.getState().todoList, oList, todoTemp);
})

function bindEvent () {
  oAddBtn.addEventListener('click', handleAddBtnClick, false);
}

function handleAddBtnClick () {
  if (!oTodoInput.value.trim().length) return;
  debugger
  store.dispatch(addTodo({
    id: new Date().getTime(),
    content: oTodoInput.value.trim(),
    completed: false
  }));

  oTodoInput.value = '';
}

init();

