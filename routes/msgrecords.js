const router = require('koa-router')()
const msgctrl = require('../controllers/msgrecords')

router.prefix('/zyf/msgrecords')


router.post('/getrecords', msgctrl.getrecords) 

module.exports = router
