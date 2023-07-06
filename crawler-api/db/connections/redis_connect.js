const redis = require('redis'),
    { REDIS_CONF } = require('../../config/db_config');

const red = redis.createClient({
    url: 'redis://' + REDIS_CONF[1] + ":" + REDIS_CONF[0]
});

red.connect();
red.on('error', (error) => {
    console.log('Redis error：' + error )
})
module.exports = red
