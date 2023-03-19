import './index.scss'
import tpl from './index.tpl'

export default () => {
  return {
    name: 'showToast',
    showToast(opt){
      let oToastBox = document.getElementsByClassName('show_toast')[0];
      if(oToastBox) return;
      let oToast = document.createElement('div');
      oToast.className = 'show_toast';
      oToast.innerHTML = tpl().replace(/{{(.*?)}}/g, function (node, key){
        return {
          icon: !opt.icon || opt.icon !== 'warning' ? 'check' : opt.icon,
          text: opt.text || '',
        }[key]
      })
      document.body.appendChild(oToast);
      setTimeout(() => {
        oToast.remove()
      }, opt.duration || 3000)
    }
  }
}