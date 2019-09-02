const Sequelize = require('sequelize');
const sequelize = require('./query');
var msgrecordsmodel = require('../models/msgrecords')(sequelize, Sequelize)
const Op = Sequelize.Op;
class msgrecordsservices {
    static async search(ctx, params) {
        let data = ctx.request.body;
        // console.log('查记录了')
        // console.log(data)
        let offset = (data.page - 1) * (data.count);
        console.log(offset)
        var result = await msgrecordsmodel.findAndCountAll({
            order: [['id', 'DESC']],
            limit: parseInt(data.count),
            offset,
            where: {
                id: {
                    [Op.lt]: data.nextlimitid
                }
            }
        });

        return JSON.parse(JSON.stringify(result))
    }

    static async add(data) {
        var result = await msgrecordsmodel.create({
            userid: data.userid,
            msg: data.msg,
            type: data.type,
            nick_name: data.nick_name,
            created_at: Date.now() + 10 * 60 * 1000
        });
        return JSON.parse(JSON.stringify(result))
    }
}

module.exports = msgrecordsservices;