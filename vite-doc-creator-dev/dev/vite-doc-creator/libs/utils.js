const { readFileSync } = require('fs')
const { domain, port } = require('../config')
function readFile(path){
    return readFileSync(path, 'utf8')
}

// 创建菜单项
function createMenuItem(filename, userDomain, userPort, isActive){
    userPort = Number(userPort);
    return `
        <li class="menu-item${isActive ? ' active' : ''}">
           <a href="${_formatBaseUrl(userDomain, userPort)}/src/html/${filename}" target="myFrame">${filename.replace('.html', '')}</a>
        </li>
    `
}

function createIframe(filename, userDomain, userPort){
    userPort = Number(userPort);
    return `
        <iframe src="${_formatBaseUrl(userDomain, userPort)}/src/html/${filename}" name="myFrame"></iframe>
    `
}

// 替换模板字符串
function replaceHtml(regexp, html, content){
    return html.replace(html.match(regexp)[1], content)
}
function _formatBaseUrl(userDomain, userPort){
    if(userDomain && userDomain){
        return `${userDomain}:${userPort}`
    }else if(userDomain && !userDomain){
        return userDomain
    }else  if(!userDomain && userPort){
        return `${domain}:${userPort}`
    }else if(!userDomain && !userPort){
        return `${domain}:${port}`
    }else {
        return `${domain}:${port}`
    }
}
module.exports = {
    readFile,
    createMenuItem,
    replaceHtml,
    createIframe
}
