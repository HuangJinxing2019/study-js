;(function(doc){

  var WrateFall = function(opt) {
    this.el = opt.el;
    this.colGrad = opt.colGrad || 0; // 列间隙
    this.rowGrad = opt.rowGrad || 0; // 行间隙
    this.columnsNum = opt.columnsNum > 0 ? opt.columnsNum : 4; //列数
    this.oWrap = null;
    this.width = 0;
    this.itemWidth = 0;
    this.heightArr = [];
    this.init();
  }
  WrateFall.prototype.init = function () {
    this.oWrap = doc.getElementsByClassName(this.el)[0];
    this.width = parseInt(getStyle(this.oWrap, 'width')); 
    this.itemWidth = (this.width - this.colGrad * this.columnsNum) / this.columnsNum;
    this.oWrap.style.position = 'relative' 
  }

  WrateFall.prototype.setData = function (list){
    this.oWrap.innerHTML = '';
    this.heightArr = [];
    this.add(list);
  }

  WrateFall.prototype.add = function (list) {
    var oFrag = doc.createDocumentFragment(),
        len = list.length,
        item;
    for(var i = 0; i < len; i++){
      item = list[i];
      oFrag.appendChild(this.createItem(item))
    }
    this.oWrap.appendChild(oFrag);
  }

  WrateFall.prototype.createItem = function (data) {
    var oDiv = doc.createElement('div'),
        oImg = new Image();
    this.setDivStyle(oDiv, data);
    oImg.src = data.url;
    oImg.style.width = '100%';
    oImg.style.height = '100%';
    oImg.style.display = 'block';
    oDiv.appendChild(oImg);
    return oDiv;
  }
  
  WrateFall.prototype.setDivStyle = function (node, data) {
    var heightArr = this.heightArr,
        arrLen = heightArr.length,
        itemWidth = this.itemWidth,
        colGrad = this.colGrad,
        itemHeight = itemWidth / data.width * data.height;
    if(arrLen < this.columnsNum) {
      node.style.top = 0;
      node.style.left = arrLen === 0 ? '0' : arrLen * (itemWidth + colGrad) + 'px';
      heightArr.push(itemHeight);
    } else {
      var minIndex = this.minIndex();
      node.style.top = heightArr[minIndex] + 10 + 'px';
      node.style.left = minIndex === 0 ? '0' : minIndex * (itemWidth + colGrad) + 'px'
      heightArr[minIndex] += itemHeight + this.rowGrad;
    }
    node.style.width = this.itemWidth + 'px';
    node.style.height = itemHeight + 'px'; 
    node.style.position = 'absolute';
    node.style.overflow = 'hidden';
    node.style.backgroundColor = '#f2f2f2'
  }
  WrateFall.prototype.minIndex = function(){
    return [].indexOf.call(this.heightArr, Math.min.apply(null, this.heightArr));
  }

  window.WrateFall = WrateFall;
})(document)