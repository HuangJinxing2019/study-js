import './index.scss'
import tpl from './index.tpl'
import CheckBox from '../checkBox'

const checkBox = new CheckBox();
export default () => {
  return {
    name: 'footerBtn',
    tpl(totalPrice, checked){
      const oFooter = document.createElement('div')
      oFooter.className = 'footer-box'
      oFooter.innerHTML = tpl().replace(/{{(.*?)}}/g, function (node, key){
      return {
          checkBox: checkBox.tpl({ checked,id: 0, mark: 'mainCheck' }),
          totalPrice,
        }[key]
      })
      return oFooter;
    },
  }
}