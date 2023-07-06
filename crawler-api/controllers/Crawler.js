const  { startProcess, qiniuUpload } = require('../libs/utils'),
    { bucket } = require('../config/qiniu_config'),
    { addAgencyInfo } = require('../services/AgencyInfo');
class Crawler{
    crawlAgencyInfo(){
        startProcess({
            file: '../crawlers/agencyInfo.js',
            async message (data){
                try {
                    const res = await qiniuUpload({
                        url: data.logo,
                        bucket: bucket.tencentClass.bucketName,
                        ext: '.jpg'
                    })
                    if(res.key) data.logoKey = res.key
                    await addAgencyInfo(data)
                } catch (err) {
                    console.log('ERROR:')
                    console.log(err)
                }
            },
            exit(code){
                console.log(code)
            }
        })
    }
}
module.exports = new Crawler();
