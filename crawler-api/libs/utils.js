const  cp = require('child_process');
const { resolve } = require('path')
const qiniuConfig = require('../config/qiniu_config');
const Qiniu = require('qiniu');
const nanoid = require('nanoid')
function startProcess(options){
    // 获取脚本文件路径
    const script = resolve(__dirname, options.file),
        // 开启子线程执行这个文件文件
        child = cp.fork(script, []);

    // 执行标记
    let invoked = false;

    child.on('message', (data) => {
        options.message(data)
    })

    child.on('exit', (code) => {
        if (invoked) return;
        invoked = true;
        options.exit && options.exit(code)
    })

    child.on('error', (err) => {
        if (invoked) return
        invoked = true
        options.error && options.error(err)
    })

}

function qiniuUpload(options){
    const mac = new Qiniu.auth.digest.Mac(qiniuConfig.ak, qiniuConfig.sk),
        conf = new Qiniu.conf.Config(),
        key = nanoid() + options.ext;
    conf.zone = Qiniu.zone.Zone_z2;
    const client = new Qiniu.rs.BucketManager(mac, conf);
    if(!options.url.startsWith('http')) options.url = 'http:' + options.url;
    return new Promise((resolve, reject) => {
        client.fetch(options.url, options.bucket, key, (error, ret, info)=>{
             if(error){
                 reject(error)
             }else {
                 if(info.statusCode === 200){
                     resolve({ key })
                 } else {
                     reject(info)
                 }
             }
        })

    })

}

module.exports = {
    startProcess,
    qiniuUpload
}
