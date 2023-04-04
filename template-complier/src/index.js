import {initMixin} from "./init";
import {lifeCycleMixin} from "./lifeCycle";
import {renderMixin} from "./vdom";

function Vue(options){
  this._init(options)
}

initMixin(Vue)
lifeCycleMixin(Vue)
renderMixin(Vue)

export default Vue