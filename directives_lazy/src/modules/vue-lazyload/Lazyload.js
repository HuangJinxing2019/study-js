import {getParentScroll} from "./utils";
import Lazyimg from "./Lazyimg";

export function Lazyload(Vue){

    return class Lazy{
        constructor(options) {
            this.options = options;
            this.isAddScrollListener = false;
            this.lazyImgPool = [];
        }
        bindLazy(el, bindings, vnode){
            Vue.nextTick(() => {
                // 获取具有滚动样式属性的父元素，为其添加滚动事件监听函数
                const parentScroll = getParentScroll(el);
                // 判断是否已经添加了滚动事件监听
                if(!this.isAddScrollListener){
                    parentScroll.addEventListener('scroll', this.scrollChange.bind(this), false)
                }
                const lazyimg = new Lazyimg({
                    el,
                    src: bindings.value,
                    options: this.options,
                    imgRender: this.imgRender,
                })
                this.lazyImgPool.push(lazyimg)
                this.scrollChange()
            })
        }

        scrollChange(){
            let isVisible = false;
            this.lazyImgPool.forEach(lazyImg => {
                //检查是否已经加载
                if(!lazyImg.isLoad){
                    // 检查是否在显示区域
                    isVisible = lazyImg.checkIsVisible()
                    // 加载图片
                    isVisible && lazyImg.loadImg()
                }
            })
        }
        // 根据lazyImg状态设置src
        imgRender(lazyImg, status){
            const { el, options } = lazyImg;
            const { loading, error } = options;
            let src = '';
            switch (status){
                case 'loading':
                    src = loading || '';
                    break;
                case 'error':
                    src = error || '';
                    break;
                default:
                    src = lazyImg.src;
                    break;
            }
            el.setAttribute('src', src);
        }
    }
}