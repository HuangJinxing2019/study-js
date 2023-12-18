import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from './pinia';
// import { createPinia } from 'pinia';

const pinia = createPinia();

console.log(pinia);

/**
 * pinia {
 *   install,
 *   .....
 * }
 * 
 * use({
 *   install
 * })
 * 
 * use() => { install } => install()
 */

createApp(App).use(pinia).mount('#app')

/**
 * createPinia(): 创建一个统一管理用户定义的store的容器 => pinia
 * defineStore(): 帮助你创建拥有state getters actions的store生成器
 */
