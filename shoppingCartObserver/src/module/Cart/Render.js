import tools from "../../utils/tools";
import cartItem from '../../template/cartItem.tpl'
import Event from "./Event";
@tools
export default class Render{
    constructor(el, observer, goodsData, cartData) {
        this.el = el
        this.goodsData = goodsData
        this.observer = observer
        this.cartData = cartData
        this.init()
    }
    init(){
       this.render()
        new Event(this.oCart, this.observer, this.goodsData, this.cartData)
    }
    render(){
        this.oCart = document.querySelector(this.el);
        const oFrag = document.createDocumentFragment()
        this.cartData.forEach(item => {
            const oLi = document.createElement('li')
            oLi.className = "item"
            const data = {
                id: item.id,
                name: item.name,
                price: item.price
            }
            oLi.innerHTML = Render.createElement(cartItem, data)
            oFrag.appendChild(oLi)
        })
        console.log(oFrag)
        this.oCart.appendChild(oFrag);
    }
}
