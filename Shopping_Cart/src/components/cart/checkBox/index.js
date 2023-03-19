import './index.scss'
import tpl from './index.tpl'

export default () => {
  return {
    name: 'checkBox',
    tpl(opt){
      return tpl().replace(/{{(.*?)}}/g, function (node, key){
        return{
          id: opt.id,
          index: opt.index,
          checked: opt.checked ? 'checked' : '',
          mark: opt.mark || '',
        }[key]
      })
    },
  }
}