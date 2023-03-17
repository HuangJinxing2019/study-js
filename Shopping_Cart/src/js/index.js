import '../scss/index.scss';
import Header from '../components/header'

const header = new Header();

const App = (doc) => {
  const oContainer = doc.getElementsByClassName('J_container')[0];
  const init = () => {
    oContainer.appendChild(header.tpl('商品列表'))
  }
  init()
}
new App(document);
