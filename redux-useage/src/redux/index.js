

/**
 * 1. 必须要获取到state => reducer(state, action)
 * 2. 必须知道reducer执行了并且state变化 =>
 *    reducer() => new state => 存储在哪里
 *                 subscribe => cb
 */
const redux = {/* _state */}
const cbs = [];

export function createStore (reducer) {
  createReduxState(reducer);
  const dispatch = createDispatcher(reducer);
  const getState = createStateGetter(reducer);
  
  return {
    dispatch, // { type, payload }
    getState,
    subscribe
  }
}

function createReduxState (reducer) {
  let _state = reducer();

  Object.defineProperty(redux, '_state', {
    get () {
      return _state;
    },
    set (newState) {
      if (_state === newState) return;
      _state = newState;
      publish();
    }
  })
}

function subscribe (cb) {
  if (cbs.includes(cb)) return;
  cbs.push(cb);
}

function publish () {
  cbs.forEach(cb => cb());
}

function createDispatcher (reducer) {
  // dispatch({ type, payload })
  return function (action) {
    redux._state = reducer(reducer._state, action);
  }
}

function createStateGetter (reducer) {
  return function () {
    return reducer(reducer._state);
  }
}