window.onload = function(){
  init()
}
function init(){
  initMag()
}

var initMag = (function(){
  var magWarp = document.getElementsByClassName('wrap-img')[0];
      mag = document.getElementsByClassName('mag')[0],
      magImg = document.getElementsByClassName('mag-img')[0],
      magWarpW = parseInt(getStyle(magWarp, 'width')),
      magWarpH = parseInt(getStyle(magWarp, 'height')),
      magW = parseInt(getStyle(mag, 'width')),
      magH = parseInt(getStyle(mag, 'height'));

  bindEvent()
  function bindEvent(){
    addEvent(magWarp, 'mouseenter', magWarpMouseenter)
  }

  function magWarpMouseenter(e){
    addEvent(document, 'mousemove', magWrapMousemove)
    magShow(true)
    setMagXY(e)
  }
  function magWrapMousemove(e){
    setMagXY(e)
  }

  function magShow(flag){
    console.log(flag)
    mag.className = flag ? 'mag show' : 'mag'
  }

  function setMagXY(e){
    var e = e || window.event,
        mwX = getElementDocPostion(magWarp).left,
        mwT = getElementDocPostion(magWarp).top;
        mX = pagePos(e).X,
        my = pagePos(e).Y,
        my = pagePos(e).Y;
    if(mX - mwX > magWarpW || mX - mwX < 0){
      magShow(false)
      removeEvent(document, 'mousemove', magWrapMousemove) 
      return
    }else if(my - mwT > magWarpH || my - mwT < 0){
      magShow(false)
      removeEvent(document, 'mousemove', magWrapMousemove) 
      return
    }
    mag.style.left = mX - mwX - (magW / 2) + 'px';
    mag.style.top = my - mwT - (magH / 2) + 'px';
    magImg.style.left = -(mX - mwX) + (magW / 2) + 'px';
    magImg.style.top = -(my - mwT) + (magH / 2) + 'px';
  }
})