const userService = require('../services/users');

class UsersController {
    //注册
    // static async add(ctx, next) {
    //     let body = ctx.request.body;
    //     console.log(body);
    //     let a = await findUser({
    //         mobile: body.mobile
    //     }).then((data) => {
    //         if (data.success) {
    //             if (data.data.length > 0) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         }
    //     }).catch(() => {

    //     });

    //     if (!body.mobile) {
    //         ctx.body = {
    //             success: false,
    //             msg: '手机号不对'
    //         }
    //         return
    //     }
    //     if (a) {
    //         ctx.body = {
    //             success: false,
    //             msg: '手机号已经存在'
    //         }
    //         return
    //     }
    //     if (!body.password) {
    //         ctx.body = {
    //             success: false,
    //             msg: '密码不能为空'
    //         }
    //         return
    //     }
    //     await userService.create(body)
    //         .then((data) => {
    //             let r = '';
    //             if (data.affectedRows != 0) {
    //                 r = '添加成功';
    //             }
    //             ctx.body = {
    //                 success: true,
    //                 data: r
    //             }
    //         }).catch(() => {
    //             ctx.body = {
    //                 success: false,
    //                 msg: 'err'
    //             }
    //         })
    // }
    //查询用户
    static async search(ctx) {
        let body = ctx.request.body;
        let a = await findUser(body).then((data) => {
            if (data.success) {
                ctx.body = {
                    success: true,
                    data: data.data
                }
            }
        }).catch(() => {
            ctx.body = {
                success: false,
                msg: 'err'
            }
        });
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