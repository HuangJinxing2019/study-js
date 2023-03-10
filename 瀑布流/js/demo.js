;(function(doc){
  window.onload = function(){
    init()
  }
  var init = function (){
    imageLazy()
  } 
  var imageLazy = function(){
    var oImgWrap = doc.getElementsByClassName('img-wrap')[0],
        oImgItem = oImgWrap.getElementsByClassName('img-item'),
        itemlen = oImgItem.length,
        width = parseInt(getStyle(oImgWrap, 'width')),
        grad = 10,
        cloumns = 4,
        itemWidth = (width - (cloumns - 1) * grad) / cloumns,
        cloumnsH = [];
    for (var i = 0; i < itemlen; i++){
      oItem = oImgItem[i];
      if(i < cloumns) {
        cloumnsH.push(parseInt(getStyle(oItem, 'height')));
        oItem.style.top = 0 + 'px'
        oItem.style.left = (i + 1) % cloumns === 1 ? '0px' : (grad + itemWidth) * i + 'px';
      } else {
        var minIdx = getMinIdx();
        oItem.style.top = cloumnsH[minIdx] + 10 + 'px';
        oItem.style.left =  (minIdx + 1) % cloumns === 1 ? '0px' : (grad + itemWidth) * minIdx + 'px';
        cloumnsH[minIdx] += (parseInt(getStyle(oItem, 'height')) + 10)
      }
    }
    function getMinIdx(){
      return minIdx = [].indexOf.call(cloumnsH, Math.min.apply(null, cloumnsH));
    }
  }
  
})(document);