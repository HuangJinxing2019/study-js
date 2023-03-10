window.onload = function(){
  init()
}
function init(){
  initMenuWrap();
}
var initMenuWrap = (function(){
    var oMenuWrap = document.getElementsByClassName('menu-wrap')[0],
        oMenuItems = oMenuWrap.getElementsByClassName('menu-item'),
        menuItemLen = oMenuItems.length,
        oSub = oMenuWrap.getElementsByClassName('sub')[0],
        oSubItems = oSub.getElementsByClassName('sub-item'),
        oMenuItem = null,
        subItem = null,
        isInsub = false,
        isFrist = true,
        // menu右侧顶点左边
        menuTopRignt = { 
          x: parseInt(getStyle(oMenuWrap, 'margin-left')) + parseInt(getStyle(oMenuWrap, 'width')),
          y: parseInt(getStyle(oMenuWrap, 'margin-top'))
        },
        // menu 右侧底部坐标， 注意：在进入每个菜单项是记录一次
        menuBottomRignt = { 
          x: parseInt(getStyle(oMenuWrap, 'margin-left')) + parseInt(getStyle(oMenuWrap, 'width')),
          y: parseInt(getStyle(oMenuWrap, 'margin-top')) + parseInt(getStyle(oMenuWrap, 'height'))
        },
        // 鼠标移动当倒数两个点的坐标
        pagePosList = [],
        isDelayed = false,
        t = null;
    bindEvent()
    function bindEvent(){
      addEvent(oMenuWrap, 'mouseenter', menuWrapMouseenter)
      addEvent(oMenuWrap, 'mouseleave', menuWrapMouseLeave)
      addEvent(oSub, 'mouseenter', subMouseenter)
      addEvent(oSub, 'mouseleave', subMouseLeave)
      for (var i = 0; i < menuItemLen; i++){
        oMenuItem = oMenuItems[i];
        addEvent(oMenuItem, 'mouseenter', menuItemMouseEnter)
      }
    };

    function subMouseenter(){
      isInsub = true
    }
    function subMouseLeave(){
      isInsub = false
    }

    function menuWrapMouseenter(e){
      addEvent(document, 'mousemove', menuMouseMove)
    }

    // 监听鼠标移动，并记录鼠标移动的坐标。
    function menuMouseMove(e){
      var e = e || window.event;
      pagePosList.push({
        x: pagePos(e).X,
        y: pagePos(e).Y,
      })
      if(pagePosList.length >= 3){
        pagePosList.shift();
      }
    };

    // 菜单列表监听鼠标进入
    function menuItemMouseEnter(e){
      var e = e || window.event;
      doTimeout()
      if(t){
        clearTimeout(t)
      }
      if(isFrist || !isDelayed){
        isFrist = false
        showHide(e);
      }else{
        t = setTimeout(function(){
          showHide(e);
        }, 300)
      }
    }
    
    function menuWrapMouseLeave(e){
      removeEvent(document, 'mousemove', menuMouseMove)
      oSub.className = 'sub hide';
      isFrist = true;
      clearTimeout(t);
      t = null;
    }
    // 鼠标行为预测，是否向子菜单移动，三角形
    function doTimeout(){
      var posLen = pagePosList.length,
          curPos = pagePosList[posLen - 1] || {x: 0, y: 0},
          lastPos = pagePosList[posLen - 2] || {x: 0, y: 0};
      isDelayed = pointInTriangle(curPos, lastPos, menuTopRignt, menuBottomRignt)
    }

    // 菜单选中和子菜单显示切换操作
    function showHide(e){
      var e = e || window.event,
          tar = e.target || e.srcElement;
      // 如果鼠标已进入子菜单，直接return
      if(isInsub) return
      oSub.className = 'sub'
      for(var i = 0; i < menuItemLen; i++){
        oMenuItem = oMenuItems[i];
        subItem = oSubItems[i];
        oMenuItem.className = 'menu-item'
        subItem.className = 'sub-item'
      }
      tar.className += ' cur'
      var itemIdx = Array.prototype.indexOf.call(oMenuItems, tar)
      oSubItems[itemIdx].className += ' active'
    }
})