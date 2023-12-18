import { createStore } from '../redux';
// import { createStore } from 'redux';
import reducer from './reducer';

export default createStore(reducer);
/**
 * store {
 *   dispatch
 *   getState
 *   subscribe(() => console.log(store.getState))
 * }
 */