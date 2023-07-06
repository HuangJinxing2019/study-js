import tools from "../../utils/tools";
import Handle from "./Handle";
@tools
export default class Event{
    constructor(oCart, observer, goodsData, cartData) {
        this.oCart = oCart
        this.observer = observer
        this.goodsData = goodsData
        this.cartData = cartData
        this.init()
    }

    init(){
        this.bindEvent()
        console.log(this.observer)
        this.handle = new Handle(this.goodsData, this.cartData, this.oCart, this.observer)
    }
    bindEvent(){
        this.oCart.addEventListener('click', this.removeBtnHandle.bind(this),false)
    }
    removeBtnHandle(ev){
        const target = Event.getTarget(ev)
        if(target.className === 'J_del_btn'){
            const id = target.getAttribute('data-id')
            this.observer.notify(id, target, 0)
        }
    }
}
