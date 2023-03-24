import Vue from '../modules/Vue'

new Vue({
    el: '#app',
    data(){
        return {
            showIfImg: true,
            showImg: true,
        }
    },
    template: `
       <img v-if="showIfImg" width="300" src="https://img-baofun.zhhainiao.com/market/133/3760b2031ff41ca0bd80bc7a8a13f7bb_preview.jpg" /> 
       <img v-show="showImg" width="300" src="https://img-baofun.zhhainiao.com/market/semvideo/3fc6cdef4427e61be69096c6ebb59a1c_preview.jpg">
       <button @click="vIfChange">v-if</button>
       <button @click="vShowChange">v-show</button>
    `,
    methods: {
        vIfChange(){
            this.showIfImg = !this.showIfImg
            console.log(this.showIfImg)
        },
        vShowChange(){
            this.showImg = !this.showImg
        }
    }
})