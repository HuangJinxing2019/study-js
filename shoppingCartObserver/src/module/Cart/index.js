import Render from "./Render";
export default class Cart{
    constructor(el, observer, goodsData, cartData) {
        this.el = el
        this.goodsData = goodsData
        this.observer = observer
        this.cartData = cartData
        this.init();
    }
    init(){
        new Render(this.el, this.observer, this.goodsData, this.cartData)
    }

}
