let goodsList = [
  {
    id: 1,
    pic: 'https://img0.baidu.com/it/u=1391154107,900911934&fm=253&fmt=auto&app=138&f=JPEG?w=543&h=500',
    title: '三只松鼠',
    price: 19.98,
    sales: 1238,
  },
  {
    id: 2,
    pic: 'https://img.zcool.cn/community/012a5c5c74acf7a801203d226c61d0.jpg@1280w_1l_2o_100sh.jpg',
    title: '发过益生菌种发酵，巴氏杀菌热处理风味酸牛奶',
    price: 69.8,
    sales: 1218,
  },
  {
    id: 3,
    pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F12570135%2F173b0fef4a96ce83bdf5141699db3a5e.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvMTI1NzAxMzUvMTczYjBmZWY0YTk2Y2U4M2JkZjUxNDE2OTlkYjNhNWUuanBn%2Fsign%2F90d4db3fb339a225d016759f40500604.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681709967&t=187588a8bb82238d0ac9d42d60a3a8b1',
    title: '快乐零食',
    price: 9.8,
    sales: 1256,
  },
  {
    id: 4,
    pic: 'https://img.pconline.com.cn/images/upload/upc/tx/itbbs/2102/10/c3/253233937_1612942162014_mthumb.jpg',
    title: '时代陶瓷水杯碗跌',
    price: 9.8,
    sales: 1338,
  },
  {
    id: 5,
    pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fbao%2Fuploaded%2Fi1%2FTB1KPR4IVXXXXa3aFXXXXXXXXXX_%21%210-item_pic.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681709967&t=6a8e09f450fb2a711d385b0f4f8ae724',
    title: '枕头',
    price: 19.8,
    sales: 1638,
  },
  {
    id: 6,
    pic: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F4795493%2Fd38699d5907720d35890094fd0a89d5b.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNDc5NTQ5My9kMzg2OTlkNTkwNzcyMGQzNTg5MDA5NGZkMGE4OWQ1Yi5qcGc%3D%2Fsign%2F77ba89b7fddd4dda3c9eca3a7ae8dd49.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681709967&t=fee5241ff5a46c42c55c11bb3072652e',
    title: '生活洗漱用品',
    price: 29.8,
    sales: 128,
  }
]
export function queryGoodsList(){
  return goodsList
}
export function queryGoodsDetail(id){
  return goodsList.find(item => item.id == id)
}