const router = require('koa-router')()
// const axios=require('axios')

// const sqlServices = require('../dbcontrollers/mysqlconfig.js')

const userctrl = require('../controllers/users')
const jwt = require('jsonwebtoken');
router.prefix('/zyf/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

// router.post('/getinfo', async function (ctx, next) {
//   let dataList = await sqlServices.findAllUserData()
//   ctx.body = { code: 20000, data: dataList }
// })


// router.post('/authcode', userctrl.authcode)
router.post('/wxlogin', userctrl.wxlogin)

router.post('/login', userctrl.login) 

router.post('/register', userctrl.register) 

module.exports = router
