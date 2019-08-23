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
      const token = jwt.sign({
        name: data.username
      }, 'my_token', { expiresIn: '24h' });
      ctx.body = { code: 20000, data: dataList }
    }
  }

  ctx.body = { code: 20000, data: doudata }

})

router.post('/comming', async function (ctx, next) {
  // console.log('111111')

  // let data = ctx.request.body;
  // console.log(data)

  // let dataList = await sqlServices.findUserData(data.username)
  // if (dataList.length <= 0) {
  //   ctx.body = { code: 50000, message: '用户不存在' }
  // } else {
  //   if (dataList[0].password != data.password) {
  //     ctx.body = { code: 50000, message: '密码错误' }
  //   } else {
  //     ctx.body = { code: 20000, data: dataList }
  //   }
  // }


  let doudata = await axios.get('http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=6').then((response) => {
    return response.data
  })

  ctx.body = { code: 20000, data: doudata }

})

module.exports = router
