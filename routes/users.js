const router = require('koa-router')()

const  sqlServices  = require('../dbcontrollers/mysqlconfig.js')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/getinfo',async function (ctx, next) {

  
  let dataList = await sqlServices.findAllUserData()
  ctx.body = dataList
})

module.exports = router
