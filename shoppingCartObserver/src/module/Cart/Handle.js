import cartItem from '../../template/cartItem.tpl'
import tools from "../../utils/tools";
@tools
export default class Handle{
    constructor(goodsData, cartData, oCart, observer) {
        this.goodsData = goodsData
        this.cartData = cartData
        this.oCart = oCart
        this.observer = observer
        this.init()
    }
    init(){
        this.observer.add(this.handleCartItem.bind(this))
    }
    handleCartItem(id, tar,  state){
        if(state){
            const oLi = document.createElement('li')
            oLi.className = 'item'
            const goods = this.goodsData.find(item  => item.id === id)
            const data = {
               id: goods.id,
               name: goods.name,
               price: goods.price,
            }
            oLi.innerHTML = Handle.createElement(cartItem, data)
            this.oCart.appendChild(oLi)
        } else {
            const parent = tar.parentNode
            parent.remove()
        }
    }
}
