module.exports = {
    MYSQL_CONF: {
        base: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000,
            }
        },
        conf: ['tencent_classroom', 'root', '123456']
    },
    REDIS_CONF: ['6379', 'localhost']
}
