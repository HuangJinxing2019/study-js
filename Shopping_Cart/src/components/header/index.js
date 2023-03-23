import './index.scss';
import tpl from './index.tpl'
export default () => {
  return {
    name: 'header',
    tpl (opt) {
      let oHeader = document.createElement('div')
      oHeader.className = 'header'
      oHeader.innerHTML = tpl().replace(/{{(.*?)}}/g, function (node, key){
        return {
          title: opt.title,
          showEdit:opt.isShowEdit ? 'show' : ''
        }[key]
      })
      return oHeader
    }
  }
}