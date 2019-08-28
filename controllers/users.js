const userService = require('../services/users');
const codeservices = require('../services/code');
var WXBizDataCrypt = require('../utils/WXBizDataCrypt')
const axios = require('axios')
const jwt = require('jsonwebtoken');
class UsersController {
    //普通登录
    static async login(ctx, next) {
        const { phonenumber, password } = ctx.request.body;
        let a = await userService.search({
            phonenumber: phonenumber,
            password: password
        })
        if (a) {
            ctx.body = {
                code: 20000,
                data: a,
                token: gettoken(a.userid),
                expiresIn: Date.now() + 72 * 60 * 60 * 1000
            }
            return;
        } else {
            ctx.body = {
                code: 50000,
                data: '登录失败，用户名/密码不存在！'
            }
            return;
        }
    }
    //普通注册
    static async register(ctx, next) {
        const { phonenumber, password, code } = ctx.request.body;
        let a = await codeservices.search({
            phonenumber: phonenumber
        })
        if (!a || a.code != code) {
            ctx.body = {
                code: 50000,
                data: '验证码错误！'
            }
            return;
        }
        let add = await userService.commonadd(
            phonenumber, password
        )
        if (add) {
            ctx.body = {
                code: 20000,
                data: add,
                token: gettoken(add.userid),
                expiresIn: Date.now() + 72 * 60 * 60 * 1000
            }
            return;
        } else {
            ctx.body = {
                code: 50000,
                data: '注册失败！'
            }
            return;
        }
    }


    //auth.code2Session
    async authcode(code) {
        const appid = 'wx0ad35abe0567768f'
        const secret = 'd651ac03645a922a1061288dd6f2ac3a'
        let res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`).then((res) => {
            return res
        })
        return res
    }

    //微信登录
    static async wxlogin(ctx, next) {
        let data = ctx.request.body;
        console.log('微信登录')
        console.log(data)
        const appid = 'wx0ad35abe0567768f'
        const secret = 'd651ac03645a922a1061288dd6f2ac3a'
        let res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${data.code}&grant_type=authorization_code`).then((res) => {
            return res
        })

        // let authdata = await authcode(data.code)
        const { openid, session_key } = res.data;
        let a = await userService.search({
            openid: openid
        })
        console.log('login查找数据')
        console.log(a)
        if (a) {
            ctx.body = {
                code: 20000,
                data: a,
                token: gettoken(a.userid),
                expiresIn: Date.now() + 72 * 60 * 60 * 1000
            }
            return;
        } else {
            console.log(session_key)
            console.log(data.encryptedData)
            console.log(data.iv)
            const appid = 'wx0ad35abe0567768f'
            var pc = new WXBizDataCrypt(appid, session_key)
            var decryptData = pc.decryptData(data.encryptedData, data.iv)
            console.log('解密后的数据：')
            console.log(decryptData)
            let add = await userService.add(
                decryptData, openid
            )
            if (add) {
                ctx.body = {
                    code: 20000,
                    data: add,
                    token: gettoken(add.userid),
                    expiresIn: Date.now() + 72 * 60 * 60 * 1000
                }
                return;
            }
        }
        ctx.body = {
            code: 50000,
            data: '微信登录失败，服务器错误！'
        }
        return;
    }

    //修改密码
    // static async edit(ctx, next) {
    //     let body = ctx.request.body;
    //     let a = await findUser({ mobile: body.mobile }).then((data) => {
    //         if (data.success) {
    //             return {
    //                 success: true,
    //                 data: data.data
    //             }
    //         }
    //     }).catch(() => {
    //         return {
    //             success: false,
    //             msg: '出错了'
    //         }
    //     });
    //     if (a.success && a.data.length < 1) {
    //         ctx.body = {
    //             success: false,
    //             msg: '没有这个用户'
    //         }
    //         return
    //     }
    //     await userService.edit(body).then((data) => {
    //         if (data.success) {
    //             ctx.body = {
    //                 success: true,
    //                 msg: '修改成功'
    //             }
    //         } else {
    //             ctx.body = {
    //                 success: false,
    //                 msg: data.msg
    //             }
    //         }

    //     }).catch(() => {
    //         ctx.body = {
    //             success: false,
    //             msg: 'err'
    //         }
    //     });

    // }

    //删除用户
    // static async delete(ctx, next) {
    //     let body = ctx.request.body;
    //     await userService.delete(body).then((data) => {
    //         if (data.success) {
    //             ctx.body = {
    //                 success: true,
    //                 msg: '删除成功'
    //             }
    //         } else {
    //             ctx.body = {
    //                 success: false,
    //                 msg: data.msg
    //             }
    //         }

    //     }).catch(() => {
    //         ctx.body = {
    //             success: false,
    //             msg: 'err'
    //         }
    //     });
    // }

    //登陆
    // static async Login(ctx, next) {
    //     const data = ctx.request.body;
    //     console.log(data)
    //     if (!data.mobile || !data.password) {
    //         return ctx.body = {
    //             code: '000002',
    //             data: null,
    //             msg: '参数不合法'
    //         }
    //     }
    //     await userService.Login(data).then((result) => {
    //         console.log(result)
    //         console.log('result')
    //         if (result !== null) {
    //             const token = jwt.sign({
    //                 mobile: result.mobile,
    //                 uid: result.uid
    //             }, 'my_token', { expiresIn: '8h' });
    //             return ctx.body = {
    //                 success: true,
    //                 code: '000001',
    //                 data: token,
    //                 msg: '登录成功'
    //             }
    //         } else {
    //             return ctx.body = {
    //                 success: false,
    //                 code: '000002',
    //                 data: null,
    //                 msg: '用户名或密码错误'
    //             }
    //         }
    //     }).catch(() => {
    //         ctx.body = {
    //             success: false,
    //             msg: 'err'
    //         }
    //     });

    // }
};


gettoken = function (userid) {
    const token = jwt.sign({
        userid: userid
    }, 'my_token', { expiresIn: '72h' });
    return token
}

findUser = async (params) => {
    let data = '';
    data = await userService.search(params).then((data) => {
        return {
            success: true,
            data: data
        }
    }).catch(() => {
        return {
            success: false,
            data: 'err'
        }
    })
    return data
};

module.exports = UsersController;