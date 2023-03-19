class Cart{
  constructor() {
    if(!Cart.instance){
      this.goodsList = [
        {
          id: 2,
          pic: 'https://img.zcool.cn/community/012a5c5c74acf7a801203d226c61d0.jpg@1280w_1l_2o_100sh.jpg',
          title: '发过益生菌种发酵，巴氏杀菌热处理风味酸牛奶',
          price: 69.8,
          sales: 1218,
          num: 1,
        },
        {
          id: 3,
          pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F12570135%2F173b0fef4a96ce83bdf5141699db3a5e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTI1NzAxMzUvMTczYjBmZWY0YTk2Y2U4M2JkZjUxNDE2OTlkYjNhNWUuanBn%2Fsign%2F90d4db3fb339a225d016759f40500604.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681709967&t=187588a8bb82238d0ac9d42d60a3a8b1',
          title: '快乐零食',
          price: 9.8,
          sales: 1256,
          num: 1,
        },
        {
          id: 4,
          pic: 'https://img.pconline.com.cn/images/upload/upc/tx/itbbs/2102/10/c3/253233937_1612942162014_mthumb.jpg',
          title: '时代陶瓷水杯碗跌',
          price: 9.8,
          sales: 1338,
          num: 1,
        },
      ]
      Cart.instance = this
    }
   return Cart.instance
  }
  getGoodsList(){
    return this.goodsList
  }
  addGoods(goods){
    let goodsList = this.goodsList
    let index = goodsList.findIndex(item => item.id === goods.id)
    if(index !== -1){
      goodsList[index].num += 1
    } else {
      goods.num = 1
      goodsList.unshift(goods)
    }
  }
}
export default new Cart()
