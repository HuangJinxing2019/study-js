const AgencyInfoModel = require('../db/models/agencyInfo')

class AgencyInfoService {
    async addAgencyInfo(data) {
        const { cid } = data;
        const result = await AgencyInfoModel.findOne({ where: { cid } })
        if ( result ) {
            await AgencyInfoModel.update(data, { where: {cid } })
        }else {
            await AgencyInfoModel.create(data)
        }
    }
}

module.exports = new AgencyInfoService()
