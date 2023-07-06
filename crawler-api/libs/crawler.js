const puppeteer = require('puppeteer');
module.exports = async function (options){
    try {
        const bs = await puppeteer.launch(),
            page = await bs.newPage();
        await page.goto(options.url, {waitUntil: 'networkidle2'});
        const data = await options.callback(page)
        await page.close();
        process.send(data)
        setTimeout(() => {
            process.exit();
        }, 1000)
    } catch (err) {
        console.log(err)
    }
}
