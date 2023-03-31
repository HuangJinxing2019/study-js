import { init } from "./init";

class Vue{
    constructor(options) {
        this._init(options)
    }
    _init(options){
        const vm = this;
        init(vm, options)
    }
}
export default Vue