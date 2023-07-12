const { mkdirSync, existsSync } = require('fs')
const {
    outPath: {
        srcPath, // src
        jsPath,  // src/js
        cssPath, // src/css
        htmlPath, // src/html
        mdPath,  // workspace
    }
} = require('../config');
function initFolders() {
    // 检查文件在是否已经存在，不存在则创建文件夹
    if (!existsSync(srcPath)) createFolder(srcPath)
    if (!existsSync(cssPath)) createFolder(cssPath)
    if (!existsSync(jsPath)) createFolder(jsPath)
    if (!existsSync(htmlPath)) createFolder(htmlPath)
    if (!existsSync(mdPath)) createFolder(mdPath)
}

// 创建文件夹
function createFolder(path){
    mkdirSync(path, function (err){
        if(err) throw new Error('创建文件夹失败' + err);
    })
}

module.exports = initFolders
