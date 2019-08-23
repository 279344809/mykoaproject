const Sequelize = require('sequelize');
const sequelize = require('./query');
var codemodel = require('../models/code')(sequelize, Sequelize)

class codeservices {
    static async search(params) {
        var result = await codemodel.findOne({
            where: params
        });
        return JSON.parse(JSON.stringify(result) ) 
    }

    static async add(ctx, next) {
        let data = ctx.request.body;
        var result = await codemodel.create({
            code:data.code ,
            phonenumber: data.phonenumber,
            exp: Date.now() + 10 * 60 * 1000
        });
        return JSON.parse(JSON.stringify(result) ) 
    }
    static async update(ctx, next) {
        let data = ctx.request.body;
        var result = await codemodel.update({
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

module.exports = codeservices;