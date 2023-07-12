const {
    initFiles,
    initFolders,
    initWatchers
} = require('./init')
class ViteDocCreator{
    constructor(options) {
        this.options = {
            domain: undefined, //域名
            port: 0, // 端口号
            title: undefined, // 页面标题
        };
       if(options){
           Object.assign(this.options, options);
       }
       this.initialize();
    }
    initialize(){
    //     初始化文件夹
        initFolders();

    //     初始化文件
        initFiles(this.options);

    // 初始化监听html与markdown文件及文件夹变化程序
        initWatchers(this.options);
    }
}

module.exports = ViteDocCreator
