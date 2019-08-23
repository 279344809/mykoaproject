const Sequelize = require('sequelize');
const sequelize = require('./query');
var usermodels = require('../models/users')(sequelize, Sequelize)

class Usersservices {
    static async search(params) {
        var result = await usermodels.findOne({
            where: params
        });
        return JSON.parse(JSON.stringify(result) ) 
    }

    static async add(data,openid) {
        var result = await usermodels.create({
            avatar_url: data.avatarUrl,
            openid:openid,
            password:'666666',
            nick_name:data.nickName,
            gender:data.gender,
            updated_at: Date.now(),
            created_at: Date.now(),
        });
        return JSON.parse(JSON.stringify(result) ) 
    }
    static async update(ctx, next) {
        let data = ctx.request.body;
        var result = await usermodels.update({
            code: data.code,
            exp: Date.now() + 10 * 60 * 1000
        }, {
                where: {
                    phonenumber: data.phonenumber
                }
            });
        return JSON.parse(JSON.stringify(result) ) 
    }


}

module.exports = Usersservices;