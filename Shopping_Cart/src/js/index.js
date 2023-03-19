import '../scss/index.scss';
import Header from '../components/header'
import { queryGoodsList } from '../models/index'
import ListItem from '../components/index/listItem'
const header = new Header();
const listItem = new ListItem();

const App = (doc) => {
  const oContainer = doc.getElementsByClassName('J_container')[0];
  const oList = doc.getElementsByClassName('J_list')[0];
  const init = () => {
    oContainer.appendChild(header.tpl({title: '商品详情'}))
    getGoodsList()
  }
  const getGoodsList = () => {
    const res = queryGoodsList()
    oList.innerHTML = res.map(goods => {
      return listItem.tpl().replace(/{{(.*?)}}/g, function (node, key){
        return ({
          id: goods.id,
          pic: goods.pic,
          title: goods.title,
          price: goods.price
        })[key.trim()]
      })
    }).join('')
  }
  init()
}
new App(document);
