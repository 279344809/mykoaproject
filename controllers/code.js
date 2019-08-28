const codeservices = require('../services/code');
const sendmsg = require('../utils/QcloudSms.js')
const sendmsgpromise = require('../utils/tencentSms.js')
const randomcode = require('../utils/randomcode.js')

class CodeController {
    //获取验证码
    static async getcode(ctx, next) {
        let body = ctx.request.body;
        let a = await codeservices.search({
            phonenumber: body.phonenumber
        })
        console.log('获取验证码')
        if (a) {
            console.log('当前时间')
            console.log(Date.now())
            console.log('过期时间')
            console.log(a.exp)
            if (Date.now() > a.exp) {
                console.log('过期了，重新生成验证码下发')
                ctx.request.body.code = randomcode()
                let update = await codeservices.update(ctx, next)
                console.log(update)
                if (update.length > 0) {

                    let sendms = await sendmsgpromise(ctx.request.body.phonenumber, ctx.request.body.code)
                    if (sendms) {
                        ctx.body = {
                            code: 20000,
                            data: {
                                msg: '过期重新获取验证码发送成功'
                            }
                        }
                        return
                    } else {
                        ctx.body = {
                            code: 50000,
                            data: {
                                msg: '腾讯云短信平台系统错误'
                            }
                        }
                        return
                    }
                }
            }
            else {
                console.log('没过期呢，直接下发')
                let sendms = await sendmsgpromise(a.phonenumber, a.code)
                if (sendms) {
                    ctx.body = {
                        code: 20000,
                        data: {
                            msg: '没过期呢，直接下发'
                        }
                    }
                    return
                } else {
                    ctx.body = {
                        code: 50000,
                        data: {
                            msg: '腾讯云短信平台系统错误'
                        }
                    }
                    return
                }
            }
        } else {
            console.log('新增')
            ctx.request.body.code = randomcode()
            let add = await codeservices.add(ctx, next)
            console.log(add)
            if (add) {
                let sendms = await sendmsgpromise(ctx.request.body.phonenumber, ctx.request.body.code)
                if (sendms) {
                    ctx.body = {
                        code: 20000,
                        data: {
                            msg: '新增,下发'
                        }
                    }
                    return
                } else {
                    ctx.body = {
                        code: 50000,
                        data: {
                            msg: '腾讯云短信平台系统错误'
                        }
                    }
                    return
                }

            }
        }
        ctx.body = {
            code: 50000,
            data: {
                msg: '网络繁忙'
            }
        }
        return

    }



    //验证验证码
    static async checkcode(ctx, next) {
        let body = ctx.request.body;
        console.log(body);
        let a = await codeservices.search({
            phonenumber: body.phonenumber
        }).then((data) => {
            if (data.success) {
                if (data.data.length > 0) {
                    return true
                } else {
                    return false
                }
            }
        }).catch(() => {

        });

        if (!body.mobile) {
            ctx.body = {
                success: false,
                msg: '手机号不对'
            }
            return
        }
        if (a) {
            ctx.body = {
                success: false,
                msg: '手机号已经存在'
            }
            return
        }
        if (!body.password) {
            ctx.body = {
                success: false,
                msg: '密码不能为空'
            }
            return
        }
        await codeservices.create(body)
            .then((data) => {
                let r = '';
                if (data.affectedRows != 0) {
                    r = '添加成功';
                }
                ctx.body = {
                    success: true,
                    data: r
                }
            }).catch(() => {
                ctx.body = {
                    success: false,
                    msg: 'err'
                }
            })
    }


};



module.exports = CodeController;