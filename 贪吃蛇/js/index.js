;(function(dom){
  var Snake = function(el){
    if(!(el instanceof HTMLElement)) return console.log(new ReferenceError('请传入块级元素'));
    this.el = el;
    this.width = 0;
    this.height = 0;
    this.childs = [
      {x: 20, y: 20},
      {x: 20, y: 40},
      {x: 20, y: 60},
      {x: 20, y: 80},
      {x: 20, y: 100},
    ];
    this.t = null;
    this.type = 'down';
    this.oFood = null;
    this.init()
  }

  Snake.prototype.init = function (){
    this.el.style.position = 'relative';
    this.width = parseInt(getStyle(this.el, 'width'));
    this.height = parseInt(getStyle(this.el, 'height'));
    this.draw();
    this.createFood();
    this.bindEvent(); 
    this.run();
  }

  Snake.prototype.run = function(){
    var _self = this;
    this.t = setInterval(function(){
      _self.removeDraw()
      _self.moveCoord()
      _self.draw()
      _self.eat()
    },300)
  },

  Snake.prototype.moveCoord = function(type){
    var head = this.childs[this.childs.length - 1],
        width = this.width,
        height = this.height,
        newHead = null,
        t = null;
    switch(this.type){
      case 'top':
        if(head.y - 20 < 0){
          newHead = {
            x: head.x,
            y: height
          }
        }else{
          newHead = {
            x: head.x,
            y: head.y - 20
          }
        }
        
        break;
      case 'down':
        if(head.y + 20 > height){
          newHead = {
            x: head.x,
            y: 0
          }
        }else{
          newHead = {
            x: head.x,
            y: head.y + 20
          }
        }
        
        break;
      case 'left':
        if(head.x - 20 < 0){
          newHead = {
            x: width,
            y: head.y
          }
        }else{
          newHead = {
            x: head.x - 20,
            y: head.y
          }
        }
        break;
      case 'right':
        if(head.x + 20 > width){
          newHead = {
            x: 0,
            y: head.y
          }
        }else{
          newHead = {
            x: head.x + 20,
            y: head.y
          }
        }
        break;
      default: 
        break;
    }
    if(type !== 'eat') this.childs.shift();
    this.childs.push(newHead);
    if(isGameOver(this.childs)){
      var _self = this;
      t = setTimeout(function(){
        alert('游戏结束')
        clearTimeout(t);
        clearInterval(_self.t);
      },200);
    }
  },
  Snake.prototype.eat = function(){
    var head = this.childs[this.childs.length - 1],
        oF = this.oFood;
    if(parseInt(getStyle(oF, 'left')) === head.x && parseInt(getStyle(oF, 'top')) === head.y){
      this.removeFood()
      this.createFood()
      this.moveCoord('eat')
    }
  }
  Snake.prototype.draw = function(){
    var oFrag = dom.createDocumentFragment(),
        childLen = this.childs.length,
        child = null;
    for(var i = 0; i < childLen; i++){
      child = this.childs[i];
      var oSpan = dom.createElement('span')
      oSpan.style.display = 'block';
      oSpan.style.position = 'absolute';
      oSpan.style.left = child.x + 'px';
      oSpan.style.top = child.y + 'px';
      oSpan.style.width = '20px';
      oSpan.style.height = '20px';
      oSpan.style.borderRadius = '50%';
      oSpan.style.background = childLen - 1 === i ? 'red' : 'green';
      oFrag.appendChild(oSpan)
    }
    this.el.appendChild(oFrag)
  }

  Snake.prototype.bindEvent = function (){
    var _self = this
    addEvent(dom, 'keyup', keyupChange.bind(_self))
  }

  Snake.prototype.removeDraw = function(){
    var childList = elementChildren(this.el),
        len = childList.length,
        item = null;
    for(var i = 0; i < len; i++){
      item = childList[i];
      if(item != this.oFood) item.remove()
    }
  }

  function keyupChange(e){
    var e = e || window.event,
        type = this.type;
    switch(e.keyCode){
      case 37:
        if(type !== 'left' && type !== 'right'){
          type = 'left'
        }
        break;
      case 38:
        if(type !== 'top' && type !== 'down'){
          type = 'top'
        }
        break;
      case 39:
        if(type !== 'left' && type !== 'right'){
          type = 'right'
        }
        break;
      case 40:
        if(type !== 'top' && type !== 'down'){
          type = 'down'
        }
        break;
      default:
        break;
    }
    this.type = type;
  }

  Snake.prototype.createFood = function(){
    var width = this.width,
        height = this.height,
        head = this.childs[this.childs.length - 1],
        oF = dom.createElement('div');
    oF.style.position = 'absolute';
    oF.style.left = getFoodXY(width, height, head).x + 'px';
    oF.style.top = getFoodXY(width, height, head).y + 'px';
    console.log(oF.style.left, oF.style.top)
    oF.style.width = '20px';
    oF.style.height = '20px';
    oF.style.borderRadius = '50%';
    oF.style.background = 'yellow';
    this.oFood = oF;
    this.el.appendChild(oF);
  }

  Snake.prototype.removeFood = function(){
    this.oFood.remove()
  }
  function getFoodXY(width, height, head){
    var x = parseInt(Math.random() * width / 20) * 20,
        y = parseInt(Math.random() * height / 20) * 20;
    if(head.x !== x && head.y !== y){
      return {
        x: x,
        y: y,
      }
    }
    return getFoodXY(width, height, head)
  }
  function isGameOver(childs){
    var len = childs.length,
        head = childs[len - 1],
        item = null;
    for(var i = 0; i < len - 1; i++){
      item = childs[i];
      if(item.x === head.x && item.y === head.y){
        return true
      }
    }
    return false;
  }

  window.Snake = Snake
})(document)