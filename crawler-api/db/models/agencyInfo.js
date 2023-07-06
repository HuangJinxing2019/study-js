const seq = require('../connections/mysql_connect'),
    { STRING, INT } = require('../../config/db_type_config');

const AgencyInfo = seq.define('agency_info', {
    cid: {
        comment: 'ID',
        type: INT,
        allowNull: false,
        unique: true,
    },
    logo: {
        comment: 'logo 图片',
        type: STRING,
        allowNull: false,
    },
    name: {
        comment: '机构名称',
        type: STRING,
        allowNull: false,
    },
    description: {
        comment: '机构描述',
        type: STRING,
    },
    logoKey: {
        comment: 'qiniu文件名称',
        type: STRING,
        allowNull: false,
    }
})
module.exports = AgencyInfo;

