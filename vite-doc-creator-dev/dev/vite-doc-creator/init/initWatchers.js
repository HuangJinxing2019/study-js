const { watch, existsSync, unlinkSync } = require('fs')
/**
 * watch监听文件或文件夹变化
 * @param path 监听的路径
 * @param callback 文件内容变化后的回调函数
 */
/**
 * callback 回调函数
 * @param event 事件类型 change
 * @param filename 变化的文件名称
 */
const {
    outPath: {
        htmlPath,
        mdPath
    }
} = require('../config')

const { createIndexHtml, mdToHtml } = require('../compier')




function initWatchers(options){
    watchHtml(options)
    watchMarkdown()
}

// 监听src/html目录下的文件
function watchHtml(options){
    watch(htmlPath, function (event, filename){
        if(filename){
            // event === change 文件更改 重新生成index.html文件, 传入filename
            createIndexHtml(options, event === 'change' ? filename : '')
        }
    })
}

// 监听workspace目录下的md文件
function watchMarkdown(){
    watch(mdPath, function(event, filename){
        if(filename){
            // 检查文件是否存在，如果不存在了，则需删除scr/html对应的文件
            if(!existsSync(mdPath + '/' + filename)){
                const removing = htmlPath + '/' + filename.replace('.md', '.html')
                // 检查文件是否存在，存在则删除
                existsSync(removing) && unlinkSync(removing)
                return
            }
            // md转html
            mdToHtml(filename)
        }
    })

}

module.exports = initWatchers
