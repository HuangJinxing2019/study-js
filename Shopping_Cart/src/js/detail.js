import '../scss/detail.scss'
import { getUrlQuery } from "../utils/tools";
import Header from '../components/header';
import ImgShow from  '../components/detail/imgShow';
import InfoBox from '../components/detail/infoBox';
import TitleBox from '../components/detail/titleBox';
import FooterBox from '../components/detail/footerBox';
import Toast from '../components/showToast';
import { queryGoodsDetail } from '../models'
  import cart from "../models/cartModel";

const header = new Header();
const imgShow = new ImgShow();
const infoBox = new InfoBox();
const titleBox = new TitleBox();
const footerBox = new FooterBox();
const toast = new Toast();

const Detail = (doc) => {
  const oContainer = doc.getElementsByClassName('J_container')[0];
  const oDetail = doc.getElementsByClassName('J_detail')[0];
  const queryData = getUrlQuery() || {};
  let detail = null;
  const init = () => {
    oContainer.appendChild(header.tpl({title: '商品详情'}));
    getDetail();
  }
  const getDetail = () => {
    detail = queryGoodsDetail(queryData.id);
    if(!detail) return
    let html = '';
    html += imgShow.tpl().replace(/{{(.*?)}}/, detail.pic)
    html += infoBox.tpl().replace(/{{(.*?)}}/g, function (node,key){
      return {
        price: detail.price,
        sales: detail.sales
      }[key];
    })
    html += titleBox.tpl().replace(/{{(.*?)}}/, detail.title);
    html += footerBox.tpl().replace(/{{.*?}}/, detail.id)
    oDetail.innerHTML = html;
    bindEvent()
  }

  const bindEvent = () => {
    const oFooter = doc.getElementsByClassName('footer_box')[0];
    oFooter.addEventListener('click', footerClickHandel, false);
  }

  const footerClickHandel = (e) => {
    let tar = e.target;
    if(tar.className === 'btn add_cart'){
      if(!detail) return
      cart.addGoods(detail)
      console.log(cart)
      toast.showToast({text: '添加成功'})
    }
  }

  init()
}
new Detail(document)