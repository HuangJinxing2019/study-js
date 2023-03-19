import './index.scss';
import tpl from './index.tpl';

export default () => {
  return {
    name: 'emptyBox',
    tpl(title){
      return tpl().replace(/{{(.*?)}}/, title);
    }
  }
}