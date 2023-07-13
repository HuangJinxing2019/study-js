const { readdirSync, copyFileSyn, writeFileSync } = require('fs')
const { readFile, replaceHtml } = require('../libs/utils')
const {
    title,
    outPath: {
        htmlPath,
        rootPath,
    },
    innerDir: {
        htmlDir
    },
    regexp:{
        reg_ulContent,
        reg_titleContent,
        reg_headerTitleContent,
        reg_iframePageContent
    }
} = require('../config')
const { createMenuItem, createIframe } = require('../libs/utils')
// 创建index.html
function createIndexHtml(options, outerFilename){
    const { domain, port } = options
    const _htmlFiles = readdirSync(htmlPath)

    // 当外层html文件夹为空时，将模板index.html直接复制到外层根目录下
    if(_htmlFiles.length === 0){
        copyFileSync(htmlDir + '/index.html', rootPath + '/index.html', 0, function (err){
            if(err) throw new Error('拷贝文件出错'+ err)
        })
        return
    }

    // 读取模板文件index.html
    const _indexHtmlStr = readFile(htmlDir + '/index.html')
    let _menuList = '',
        curIndex = outerFilename ? _htmlFiles.indexOf(outerFilename) : 0;
    // 遍历外层html文件夹下的所有文件，并组合成menuList
    _htmlFiles.map(function (filename, index){
        _menuList += createMenuItem(filename, domain, port, curIndex === index)
    })

    // 替换ul中的内容
    let newHtml = replaceHtml(reg_ulContent, _indexHtmlStr, _menuList);
    // 替换title中的内容
    newHtml = replaceHtml(reg_titleContent, newHtml, options.title || title)
    // 替换header-title中的内容
    newHtml = replaceHtml(reg_headerTitleContent, newHtml, options.title || title)
    // 替换iframe page中的内容
    newHtml = replaceHtml(reg_iframePageContent, newHtml, createIframe(_htmlFiles[curIndex], domain, port))
    // 写入文件
    writeFileSync(rootPath + '/index.html', newHtml)
}
module.exports = {
    createIndexHtml
}
