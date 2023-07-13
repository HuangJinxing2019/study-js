const ViteDocCreator = require('./dev/vite-doc-creator')
export default {
    plugin: [
        new ViteDocCreator({
            title: '一个轻快的文档生成器',
            port: 5173
        })
    ]
}
