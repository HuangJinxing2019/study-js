export function getParentScroll(el){
    let _parent = el.parentNode;
    while (_parent){
        const styleOverflow = getComputedStyle(_parent)['overflow']

        if(/(auto)|(scroll)/.test(styleOverflow)){
            return _parent
        }
        _parent = _parent.parentNode
    }
}
export function imgLoad(url){
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = url;
        img.onload = resolve
        img.onerror = reject
    })
}