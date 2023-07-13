const { writeFileSync } = require('fs')
const { marked } = require('marked')
const highlight = require('highlight.js')
const { readFile } = require('../libs/utils')
const {
    outPath: {
        mdPath,
        htmlPath
    },
    innerDir: {
        htmlDir
    },
    regexp: {
        reg_mdStr
    }
} = require('../config')

// 设置markdown代码高亮
marked.setOptions({
    highlight: function (code){
        return highlight.highlightAuto(code).value
    }
})

// markdown转html的方法
function mdToHtml(filename){
    // 获取md的内部html内容
    let _htmlStr = readFile(htmlDir + '/md.html'),
    // 读取md文件内容
        _mdStr = readFile(mdPath + '/' + filename);

    // mdStr转换成html代码
    const mdHtml = marked(_mdStr);

    // 将html模板里的{{newStr}}替换为mdHtml
    _htmlStr = _htmlStr.replace(reg_mdStr, mdHtml);

    // 将_htmlStr内写入html文件并保存到src/html目录下
    writeFileSync(htmlPath + '/' + filename.replace('.md', '.html'), _htmlStr, function (err){
        if(err) throw new Error('写入文件失败'+err)
    });
}
module.exports = mdToHtml
