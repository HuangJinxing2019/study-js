import './index.scss';
import tpl from './index.tpl';
import CheckBox from '../checkBox';
import Stepper from '../stepper';
import Toast from '../../showToast';

const checkBox = new CheckBox();
const stepper = new Stepper();
const toast = new Toast();
export default () => {
  return {
    name: 'listItem',
    tpl(data, index){
      return tpl().replace(/{{(.*)}}/g, function (node, key){
        return{
          checkBox: checkBox.tpl({id: data.id, index,checked: data.checked, mark: 'subCheck'}),
          price: data.price,
          id: data.id,
          index: index,
          title: data.title,
          pic: data.pic,
          stepperBox: stepper.tpl(data.id, data.num, data.max || -1)
        }[key]
      })
    },
    eventChange(e){
      let tar = e.target,
          tagName = tar.tagName.toLocaleLowerCase();
      return new Promise((resolve, reject) => {
        if(tagName === 'button'){
          let parent = tar.parentNode,
              id = parent.dataset.id,
              oInput = document.getElementById('J_stepper_'+id),
              inputValue = parseInt(oInput.value),
              field = tar.dataset.field;
          switch (field) {
            case 'add':
              let max = parseInt(tar.dataset.max);
              if(max !== -1 && inputValue > max) {
                toast.showToast({ icon: 'warning', text: '超出最大数量' })
              } else {
                inputValue += 1;
              }
              break;
            case 'minus':
              if(inputValue > 1){
                inputValue -= 1;
              }
              break;
            default:
              break;
          }
          oInput.value = inputValue;
          resolve({
            id,
            type: 'stepper',
            num: inputValue,
          })
        } else if (tagName === 'input' && tar.type === 'checkbox'){
          let parent = tar.parentNode,
              id = parent.dataset.id,
              oInput = document.getElementById('J_checked_'+id);
          resolve({
            id,
            type: 'checked',
            checked: oInput.checked,
          })
        } else if (tagName === 'span' && tar.className === 'fa fa-trash') {
          let listItem = tar.parentNode.parentNode,
              id = tar.dataset.id;
          listItem.remove();
          resolve({
            type: 'remove',
            id,
          })
        }
        resolve(-1)
      })
    },
    showRemove(flag){
      const oRemoveBox = document.getElementsByClassName('remove_box');
      let list = Array.from(oRemoveBox);
      list.forEach(item => {
        item.className = flag ? 'remove_box show' : 'remove_box'
      })
    },
    checkedChange(flag){
      const oCheckList = document.getElementsByClassName('J_subCheck');
      Array.from(oCheckList).forEach(item => {
        item.checked = flag
      })
    }
  }
}