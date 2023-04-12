import Vue from 'vue'
import App from './App';
import VueLazyLoad from './modules/vue-lazyload'
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
    preload: 1.2,
    loading: 'https://assets.madewith.cn/storage/0/images/d/5b/f75eb3af772a384d0eebb04152bcdf.gif',
    error: 'https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHBzL2ltYWdlczIwMTUuY25ibG9ncy5jb20vYmxvZy83OTQ0MzUvMjAxNzA0Lzc5NDQzNS0yMDE3MDQxMTE1MTUxMDAxNi0xMTkyMTE5NzYzLnBuZw==.jpg'
})
new Vue({
    render: h => h(App),
}).$mount('#app')
