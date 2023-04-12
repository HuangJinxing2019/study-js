import {imgLoad} from "./utils";

export default class Lazyimg {
    constructor({el, src, options, imgRender}) {
        this.el = el;
        this.src = src;
        this.options = options;
        this.imgRander = imgRender;
        this.isLoad = false;
        this.state = {
            loading: false,
            error: false,
        }
    }
    // 检查元素是否在可是区域内
    checkIsVisible(){
        const { top } = this.el.getBoundingClientRect();
        return top < window.innerHeight * (this.options.preload || 1.3)
    }

    // 加载图片
    loadImg(){
        // 设置图片loading状态
        this.imgRander(this, 'loading')
        imgLoad(this.src).then(res => {
            this.state.loading = true
            setTimeout(() => {
                this.imgRander(this, 'ok')
            }, 500)

            this.isLoad = true
        }, err => {
            this.state.error = true
            this.imgRander(this, 'error')
            this.isLoad = true;
        })
    }

}