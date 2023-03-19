import './index.scss'
import tpl from './index.tpl'

export default () => {
  return {
    name: 'stepper',
    tpl(id, num, max){
      return tpl().replace(/{{(.*?)}}/g, function (node, key){
        return { id, num, max }[key];
      })
    }
  }
}