const router = require('koa-router')()

const sqlServices = require('../dbcontrollers/mysqlconfig.js')

router.prefix('/zyf/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

router.post('/getinfo', async function (ctx, next) {
  let dataList = await sqlServices.findAllUserData()
  ctx.body = { code: 20000, data: dataList }
})


router.post('/login', async function (ctx, next) {
  // console.log('111111')

  let data = ctx.request.body;
  // console.log(data)

  let dataList = await sqlServices.findUserData(data.username)

  if (dataList.length <= 0) {
    ctx.body = { code: 50000, message: '用户不存在' }
  } else {
    if (dataList[0].password != data.password) {
      ctx.body = { code: 50000, message: '密码错误' }
    } else {
      ctx.body = { code: 20000, data: dataList }
    }


  }
})


module.exports = router
