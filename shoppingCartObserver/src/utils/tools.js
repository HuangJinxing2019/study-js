export default (target) => {
    target.createElement = (temp, data) => {
        return temp().replace(/{{(.*?)}}/g, function (node, key){
          return data[key]
        })
    }
    target.getTarget = (ev) => {
        const e = ev || window.event,
            tar = e.target;
        return tar;
    }
}
