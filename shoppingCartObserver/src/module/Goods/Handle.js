export default class Handle{
    constructor(goodsData, cartData, addBtns, observer) {
        this.goodsData = goodsData
        this.cartData = cartData
        this.addBtns = addBtns
        this.observer = observer
        this.init()
    }
    init(){
        this.observer.add(this.setState.bind(this))
        this.observer.add(this.setAddBtnText.bind(this))
    }
    setState(id, tar, state){
        this.goodsData.forEach(item => {
            if(item.id === id){
                item.state = state
                if(state){
                    this.cartData.push(item)
                } else {
                  this.cartData = this.cartData.filter(item => item.id !== id)
                }
            }
        })
    }
    setAddBtnText(id, tar, state){
        if(state){
            tar.innerText = '已添加'
            tar.disabled = true
        }else {
            const addBtn = this.addBtns[this.goodsData.findIndex(item => item.id === id)]
            addBtn.innerText = '添加商品'
            addBtn.disabled = false
        }
    }
}
