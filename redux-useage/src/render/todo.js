import store from '../store';
import { removeTodo, toggleTodo } from '../store/action';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../store/actionType';
import initialState from '../store/state';
import _ from 'lodash';

let oldTodoList = _.cloneDeep(initialState.todoList);

export default function render (newTodoList, oList, todoTemp) {
  diff(oldTodoList, newTodoList, oList, todoTemp);
  oldTodoList = _.cloneDeep(newTodoList);
}

function diff (oldTodoList, newTodoList, oList, todoTemp) {
  if (oldTodoList.length < newTodoList.length) {
    // newTodo
    // addTodo
    const newTodo = findNewTodo(oldTodoList, newTodoList);
    renderDOM(ADD_TODO, oList, todoTemp, newTodo);
    return;
  }

  if (oldTodoList.length > newTodoList.length) {
    // index
    // removeTodo
    const index = findRemovedIndex(oldTodoList, newTodoList);

    if (index !== -1) {
      renderDOM(REMOVE_TODO, oList, todoTemp, index);
    }
    return;
  }

  if (oldTodoList.length === newTodoList.length) {
    // index
    // toggleTodo
    const index = findToggleIndex(oldTodoList, newTodoList);

    if (index !== -1) {
      renderDOM(TOGGLE_TODO, oList, todoTemp, index);
    }
    return;
  }
}

function findNewTodo (oldTodoList, newTodoList) {
  return newTodoList.find((_, index) => !oldTodoList[index]);
}

function findRemovedIndex (oldTodoList, newTodoList) {
  return oldTodoList.findIndex(todo => {
    return !newTodoList.find(td => td.id == todo.id);
  });
}

function findToggleIndex (oldTodoList, newTodoList) {
  return oldTodoList.findIndex((todo, index) => todo.completed !== newTodoList[index].completed);
}

function renderDOM (actionType, oList, todoTemp, payload) {
  switch (actionType) {
    case ADD_TODO:
      appendTodo(oList, todoTemp, payload);
      break;
    case REMOVE_TODO:
      deleteTodo(oList, payload);
      break;
    case TOGGLE_TODO:
      completedTodo(oList, payload);
      break;
    default:
      break;  
  }
}

function appendTodo (oList, todoTemp, newTodo) {
  const todoStr = todoTemp.replace(/\{\{(.+?)\}\}/g, (_, key) => newTodo[key.trim()])
  const oLi = document.createElement('li');
  oLi.innerHTML = todoStr;
  oList.appendChild(oLi);

  bindEvent(oLi);
}

function deleteTodo (oList, index) {
  const oAllLi = oList.querySelectorAll('li');
  oList.removeChild(oAllLi[index]);
}

function completedTodo (oList, index) {
  const oAllLi = oList.querySelectorAll('li');
  const oTargetLi = oAllLi[index];
  const oCheckBox = oTargetLi.querySelector('input');
  const oContent = oTargetLi.querySelector('span');

  if (oCheckBox.checked) {
    oCheckBox.removeAttribute('checked');
    oContent.style.textDecoration = 'line-through';
  } else {
    oCheckBox.setAttribute('checked', 'checked');
    oContent.style.textDecoration = '';
  }
}

function bindEvent (oLi) {
  oLi.addEventListener('click', handleTodoClick, false);
}

function handleTodoClick (e) {
  const tar = e.target;
  const id = tar.dataset.id;

  switch (tar.tagName.toLowerCase()) {
    case 'input':
      store.dispatch(toggleTodo(id))
      break;
    case 'button':
      store.dispatch(removeTodo(id))
      break;
    default:
      break;
  }
} 