// 获取子元素集合
function elementChildren(node){
  var temp = {
    'length': 0,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice 
  },
    len = node.childNodes.length;
  for(var i = 0; i < len; i++){
    var childItem = node.childNodes[i]
    if(childItem.nodeType === 1){
      // temp[temp['length']] = childItem
      // temp['length']++
      temp.push(childItem)
    }
  }
  return temp
}

//添加事件监听
function addEvent(el, type, fn){
  if(el.addEventListener){
    el.addEventListener(type, fn, false);
  }else if(el.attachEvent){
    el.attachEvent('on' + type, function(){
      //这里this默认指向window，call(el)改变this指向el
      fn.call(el)
    })
  }else{
    el['on' + type] = fn
  }
}

//取消事件监听
function removeEvent(elem, type, fn){
  if(elem.addEventListener){
    elem.removeEventListener(type, fn, false);
  }else if(elem.attachEvent){
    elem.detachEvent('on' + type, fn);
  }else{
    elem['on' + 'type'] = null;
  }
}

//取消默认事件
function preventDefaultEvent(e){
  var e = e || window.event;
  if(e.preventDefault){
    e.preventDefault();
  }else{
    e.returnValue = false;
  }
}

//取消冒泡
function cancelBubble(e){
  var e = e || window.event;
  if(e.stopPropagation){
    e.stopPropagation();
  }else{
    e.cancelBubble = true;
  }
}


//获取元素样式
function getStyle(el, prop){
   if(window.getComputedStyle){
     if(prop){
       return window.getComputedStyle(el, null)[prop]
     } else {
       return window.getComputedStyle(el, null)
     }
   } else {
     if(prop){
       return el.currentStyle[prop]
     } else {
       return el.currentStyle
     }
   }
}

//获取浏览器窗口大小
function getViewportSize(){
  if(window.innerWidth){
    return{
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }else{
    //判断是否为怪异模式
    if(document.compatMode === 'BackCompat'){
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      }
    }else{
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      }
    }
  }
}

// 获取滚动页面高度
function getScrollSize(){
  if(document.body.scrollWidth){
    return {
      width: document.body.scrollWidth,
      height:document.body.scrollHeight,
    }
  } else {
    return{
      width: document.documentElement.scrollWidht,
      height: document.documentElement.scrollHeight,
    }
  }
}

// 获取滚动条位置
function getScrollOffSet(){
  if(window.pageXOffset){
    return{
      left: window.pageXOffset,
      top: window.pageYOffset,
    }
  }else{
    return{
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    }
  }
}
// 获取鼠标坐标
function pagePos(e){
  var sLeft = getScrollOffSet().left,
      sTop = getScrollOffSet().top,
      // IE8 可能会存在文档偏移
      cLeft = document.documentElement.clientLeft || 0,
      cTop = document.documentElement.clientTop || 0;
  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop -cTop
  }
}

// 获取元素在浏览器窗口的位置
function getElementDocPostion(el){
  var parent = el.offsetParent,
      offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop;
  while(parent){
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return {
    left: offsetLeft,
    top: offsetTop,
  }
}

// 鼠标行为预测，判断点是否在三角形内
var pointInTriangle = (function(){
  function vec(a, b){
    return {
      x: b.x - a.x,
      y: b.y - a.y
    }
  }
  
  function vecProduct(v1, v2){
    return v1.x * v2.y - v2.x * v1.y;
  }
  
  function sameSymbols(a, b){
    return (a ^ b) >= 0;
  }
  
  return function (p, a, b, c){
    var PA = vec(p, a),
        PB = vec(p, b),
        PC = vec(p, c),
        R1 = vecProduct(PA, PB),
        R2 = vecProduct(PB, PC),
        R3 = vecProduct(PC, PA);
    return sameSymbols(R1, R2) && sameSymbols(R2, R3);
  }
})()
