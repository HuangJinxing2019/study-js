import Goods from "./module/Goods";
import Cart from "./module/Cart";
import Observer from './observer';
import cartData from "./models/cartData";
import goodsData from "./models/goodsData";

import './style.scss'
;(() => {
    let init = function (){
        const observe = new Observer();
        new Goods('.J_goods_list', observe, goodsData, cartData)
        new Cart('.J_cart_list', observe, goodsData, cartData)
    }
    init()
})()
