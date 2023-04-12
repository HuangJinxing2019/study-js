export default {
    mounted,
    updated,
}
function mounted(el, bindings){
    const { tabClass, activeClass, currentIndex } = bindings.value;
    const tabItems = el.getElementsByClassName(tabClass);
    el.tabItems = tabItems
    tabItems[currentIndex].className = `${tabClass} ${activeClass}`
}
function updated(el, bindings){
    const { tabClass, activeClass, currentIndex } = bindings.value,
            oldCurrentIndex = bindings.oldValue.currentIndex;
    el.tabItems[oldCurrentIndex].className = tabClass
    el.tabItems[currentIndex].className = `${tabClass} ${activeClass}`
}