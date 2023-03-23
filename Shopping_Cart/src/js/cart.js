import '../scss/cart.scss'
import Header from '../components/header'
import ListItem from '../components/cart/listItem';
import FooterBox from '../components/cart/footerBox';
import EmptyBox from '../components/cart/emptyBox';
import Toast from '../components/showToast';
import cart from "../models/cartModel";

const header = new Header();
const listItem = new ListItem();
const footerBox = new FooterBox();
const emptyBox = new EmptyBox();
const toast = new Toast();
const App = (doc) => {
  const oContainer = doc.getElementsByClassName('J_container')[0],
        oList = doc.getElementsByClassName('J_list')[0];

  let isEdit = false, // 头部编辑状态
    cartList = [], // 列表数据
    domMap = { // 缓存dom元素
      oEdit: null,
      oFooter: null,
      oMainCheck: null,
      oTotalPrice: null,
    };

  // 初始化页面
  const init = () => {
    // 添加头部元素
    oContainer.appendChild(header.tpl({title: '购物车', isShowEdit: true}));
    // 获取头部的编辑元素
    domMap.oEdit = doc.getElementsByClassName('J_edit')[0];
    //获取数据
    getGoodsList();
  }

  const bindEvent = () => {
    // 监听列表点击事件
    oList.addEventListener('click', listHandel, false);
    // 监听头部的编辑点击事件
    domMap.oEdit.addEventListener('click', headerHandel, false);
    // 监听底部点击事件
    domMap.oFooter.addEventListener('click', footerHandel, false);
  }

  // 监听底部点击函数
  const footerHandel = (e) => {
    let tar = e.target,
        tagName = tar.nodeName.toLocaleLowerCase();

    if (tagName === 'input'){
      // 触发了选择check 并更新缓存的列表数据
      cartList.forEach(item => {
        item.checked = tar.checked
      })
      // 设置列表每一项的check选择状态
      listItem.checkedChange(tar.checked)
      // 更新底部check和价格总量
      renderFooter();
    }else if(tagName === 'button'){
      // 点击了购买按钮
      const ids = [];
      cartList.forEach(item => {
        if(item.checked) ids.push(item.id);
      });
      if(ids.length === 0){
        toast.showToast({icon: 'warning',text: '请选择商品'})
        return
      }
      setTimeout(() => {
        toast.showToast({ text: '购买成功' });
        // 删除购买的商品
        cartList = cartList.filter(item => !ids.includes(item.id))
        // 更新页面
        renderList()
        renderFooter()
      }, 1000)
    }
  }

  // 监听头部的点击函数
  const headerHandel = (e) => {
    let tar = e.target,
        tagName = tar.nodeName.toLocaleLowerCase();
    if(tagName === 'span'){
      if(isEdit){
        tar.innerHTML = '编辑'
        isEdit = false
      } else {
        tar.innerHTML = '完成'
        isEdit = true
      }
    }
    // 设置列表每一项的删除是否显示
    listItem.showRemove(isEdit);
  }

  // 监听列表内容点击函数
  const listHandel = (e) => {
    // 调用listItem组件内部的方法进行处理，返回promise对象
    listItem.eventChange(e).then(res => {
      if(res === -1) return
      let goods = cartList.find(item => item.id === parseInt(res.id));
      switch (res.type){
        case 'checked':
          goods.checked = res.checked;
          break;
        case 'stepper':
          goods.num = res.num;
          break;
        case 'remove':
          cartList = cartList.filter(item => {
            return item.id !== parseInt(res.id)
          })
        default:
          break;
      }
      // 更新底部内容
      renderFooter();
    })
  }

  // 获取数据
  const getGoodsList = () => {
    const list = cart.getGoodsList();
    cartList = list.map((item, index) => {
      item.checked = true;
      return item;
    })
    renderList();
    renderFooter();
    bindEvent();
  }

  // 渲染列表数据
  const renderList = () => {
    let html = '';
    cartList.forEach((item, index) => {
      html += listItem.tpl(item, index);
    })
    oList.innerHTML = html;
  }

  // 渲染底部按钮
  const renderFooter = () => {
    if(cartList.length > 0){
      let checked = true
      let totalPrice = cartList.reduce((p, item) => {
        if(!item.checked){
          checked = false;
        }
        else p += item.num * item.price
        return p
      }, 0);
      totalPrice = Number(totalPrice).toFixed(2)
      if(!domMap.oFooter){
        domMap.oFooter = footerBox.tpl(totalPrice, checked)
        oContainer.appendChild(domMap.oFooter)
        domMap.oMainCheck = domMap.oFooter.getElementsByClassName('check-input')[0],
        domMap.oTotalPrice = domMap.oFooter.getElementsByClassName('total-price')[0];
      } else {
        domMap.oMainCheck.checked = checked
        domMap.oTotalPrice.innerHTML = '￥' + totalPrice;
      }
    } else {
      if(domMap.oFooter) domMap.oFooter.remove();
      oList.innerHTML = emptyBox.tpl('购物车空空如也')
    }
  }
  init()
}
new App(document)