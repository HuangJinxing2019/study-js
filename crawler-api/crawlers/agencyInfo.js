const crawler = require('../libs/crawler')
crawler({
    url: 'https://msiwei.ke.qq.com/?tuin=304a784b#tab=0&category=-1',
    async callback(page){
        return {
            cid: 1,
            logo: await page.$eval('.kc-agency-hd-avatar-pc > img', img => img.getAttribute('src')),
            name: await page.$eval('.agency-name', o => o.textContent),
            description: await page.$eval('.agency-desc', o => o.textContent)
        }
    },
})
