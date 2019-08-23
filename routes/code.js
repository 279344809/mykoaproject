const router = require('koa-router')()
const CodeController = require('../controllers/code')
router.prefix('/zyf/code')


router.post('/getcode',CodeController.getcode)


module.exports = router
