const {REDIS_CONF} = require("./db_config");
module.exports = {
    keys: ['jhdhj@#$kdjfksk'], // 加密cookie的key
    key: 'txclass.sid', // cookie name
    prefix: 'txclass.sess', // redis key 前缀
    redisInfo: { all: `${REDIS_CONF[1]}:${REDIS_CONF[0]}` },
    cookieInfo: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 过期时间
    }
}
