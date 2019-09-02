const msgrecordsService = require('../services/msgrecords');
class MsgController {
    //普通登录
    static async getrecords(ctx, next) {
        let a = await msgrecordsService.search(ctx,{type:'1'})
        if (a) {
            ctx.body = {
                code: 20000,
                data: a
            }
            return;
        } else {
            ctx.body = {
                code: 50000,
                data: '服务器错误'
            }
            return;
        }
    }

};

module.exports = MsgController;