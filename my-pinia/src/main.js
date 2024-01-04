import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import { createPinia } from "pinia";
import { createPinia } from '@/pinia'

const pinia = createPinia();
console.log(pinia)

pinia.use(function ({ store }){
    console.log('=================')
    const localState = localStorage.getItem('PINIA_STATE_' + store.$id)
    localState && (store.$state = JSON.parse(localState));
    store.$subscribe(({ storeId }, state) => {
        localStorage.setItem('PINIA_STATE_' + storeId, JSON.stringify(state))
    })

    // 监听每个函数执行
    store.$onAction(({ after, onError }) => {
        after(() => {

        })
        onError(() => {

        })
    })
})

createApp(App).use(pinia).mount('#app')
