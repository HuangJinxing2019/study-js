const { readdirSync, copyFileSync } = require('fs')
const {
    outPath: {
        jsPath,
        cssPath,
        htmlPath,
    },
    innerDir: {
        jsDir,
        cssDir,
        htmlDir
    },
} = require('../config')

const { createIndexHtml } = require('../compier')
function initFiles(options) {
    // 复制css文件
    copyFiles('css')
    // 复制js文件
    copyFiles('js')
    // 复制html文件
    copyWelcome()
    // 创建根目录html文件
    createIndexHtml(options)
}
function copyFiles(field){
    var _innerFiles = [], // 存放读取的内部文件
        _outerFiles = [], // 存放读取的外部文件
        _dir = '', // 内部文件路径
        _path = ''; // 外部文件路径
    switch (field){
        case 'css':
            _dir = cssDir;
            _path = cssPath;
            break;
        case 'js':
            _dir = jsDir;
            _path = jsPath;
            break;
        default:
            break
    }
    // 读取内部文件夹
    _innerFiles = readdirSync(_dir)
    // 读取外部文件夹
    _outerFiles = readdirSync(_path)

    // 遍历检查内部文件在外部文件是否已存在，不存加则复制文件
    _innerFiles.map(function (innerFile){
        if (_outerFiles.indexOf(innerFile) === -1) {
            copyFileSync(_dir + '/' + innerFile, _path + '/' + innerFile, 0, function (err){
                if(err) throw new Error('拷贝文件失败'+err)
            })
        }
    })
}

// 拷贝欢迎页面
function copyWelcome(){
    // 读取外部html文件夹
    var _htmlFiles = readdirSync(htmlPath);

    // 只有在外部文件夹是空的情况下才拷贝内部html文件夹下的内容
    if(_htmlFiles.length === 0) {
        copyFileSync(htmlDir + '/welcome.html', htmlPath + '/welcome.html', 0, function (err){
            if(err) throw new Error('拷贝文件失败' + err);
        })
    }
}

module.exports = initFiles
