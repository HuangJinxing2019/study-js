const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

export function generate(ast){
    const children = generateChildren(ast.children)
    const code = `_c("${ast.tag}", ${formatAttrs(ast.attrs)}, ${children})`
    return code
}

// 获取文本
function getTextNode(text){
    if(defaultTagRE.test(text)){
        let match,
            index,
            lastIndex = defaultTagRE.lastIndex = 0,
            textArr = [];
        while ((match = defaultTagRE.exec(text))){
            index = match.index;
            if(index > lastIndex){
                textArr.push(`"${text.substring(lastIndex, index)}"`)
            }
            textArr.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length;
        }
        if(lastIndex < text.length){
            textArr.push(`"${text.substring(lastIndex)}"`)
        }
        return textArr.join('+')
    }else {
        return `"${text}"`;
    }
}

// 获取节点子元素标签
function generateChildren(children){
    if(children && children.length > 0){
        const list = children.map(child => {
            if(child.type === 1){
                child = generate(child)
            }else if(child.type === 3){
                child = `_v(${getTextNode(child.text)})`
            }
            return child
        })
        return list.join(',')
    }
}

// 格式化变迁属性->对象类型
function formatAttrs(attrs){
    let attrObj = {}
    for (let item of attrs){
        // "width: 100px; background: green"
        if(item.name === 'style') {
            let  styleObj = {}
            const styleList =  item.value.split(';').map(item => item.split(':'))
            for(let [key, value] of styleList){
                styleObj[key] = value
            }
            attrObj[item.name] = styleObj;
        } else {
            attrObj[item.name] = item.value
        }
    }
    return JSON.stringify(attrObj)
}

