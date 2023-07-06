import tools from "../../utils/tools";
import goodsItem from '../../template/goodsItem.tpl'
import goodsData from "../../models/goodsData";
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
        new Event(this.oGoods, this.observer, this.goodsData, this.cartData)
    }
    render(){
        this.oGoods = document.querySelector(this.el)
        const oFrag = document.createDocumentFragment()
        goodsData.forEach(item => {
            const oLi = document.createElement('li')
            oLi.className = 'item'
            const data = {
                id: item.id,
                name: item.name,
                price: item.price,
                btnText: item.state == 1 ? '已添加' : '添加商品',
                disabled: item.state == 1 ? 'disabled' : '',
            }
            oLi.innerHTML = Render.createElement(goodsItem, data)
            oFrag.appendChild(oLi)
        })
        this.oGoods.appendChild(oFrag)
    }
}
