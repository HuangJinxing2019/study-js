import './index.scss';
import tpl from './index.tpl'
export default () => {
  return {
    name: 'header',
    tpl (title) {
      let oHeader = document.createElement('div')
      oHeader.className = 'header'
      oHeader.innerHTML = tpl().replace(/{{(.*?)}}/, title)
      return oHeader
    }
  }
}