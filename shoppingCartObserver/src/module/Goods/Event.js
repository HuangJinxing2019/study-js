import tools from "../../utils/tools";
import Handle from "./Handle";
@tools
export default class Event{
    constructor(oGoodsList, observer, goodsData, cartData) {
        this.oGoodsList = oGoodsList
        this.addBtns = this.oGoodsList.getElementsByClassName('J_add_btn')
        this.observer = observer
        this.goodsData = goodsData
        this.cartData = cartData
        this.init()
    }

    init(){
        this.bindEvent()
        this.handle = new Handle(this.goodsData, this.cartData, this.addBtns, this.observer)
    }
    bindEvent(){
        this.oGoodsList.addEventListener('click', this.addCardHandle.bind(this),false)
    }
    addCardHandle(ev){
        const target = Event.getTarget(ev)
        if(target.className === 'J_add_btn'){
            const id = target.getAttribute('data-id')
            this.observer.notify(id, target, 1)
        }
    }
}
