const red = require('../db/connections/redis_connect');

async function redisSet(key, value, timeout = 60 * 60){
    if(typeof value === 'object'){
        value = JSON.stringify(value);
    }
    console.log(value)
    await red.set(key, value);
    await red.expire(key, timeout);
}
function redisGet(key){
    return new Promise((resolve, reject) => {
        red.get(key).then(res => {
            if(res == null){
                resolve(null)
            }
            try {
                resolve(JSON.parse(res))
            } catch (err) {
                resolve(res)
            }
        }).catch(err => {
            reject(err)
        })
    })
}
module.exports = {
    redisSet,
    redisGet
}
