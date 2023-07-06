const router = require('koa-router')();
const crawler = require('../controllers/Crawler')
const { redisSet, redisGet } = require('../libs/redisClient')

router.get('/', crawler.crawlAgencyInfo)
router.get('/session',  async (ctx, next) => {
    const session = ctx.session
    session.userInfo = {
        cid: 1,
        name: '张三',
        gander: 0,
        age: 19,
    }
    // await redisSet('userInfo', session.userInfo)
    ctx.body = ctx.session
    // await ctx.render('index')
})
router.get('/session1',  async (ctx, next) => {
    console.log(ctx.session)
    await ctx.render('index')
})

module.exports = router
