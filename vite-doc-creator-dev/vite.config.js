const ViteDocCreator = require('./dev/vite-doc-creator')
export default {
    plugin: [
        new ViteDocCreator()
    ]
}
