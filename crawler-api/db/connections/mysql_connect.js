const { Sequelize } = require('sequelize'),
    { MYSQL_CONF } = require('../../config/db_config');

const seq = new Sequelize(...MYSQL_CONF.conf, MYSQL_CONF.base);
module.exports = seq;
