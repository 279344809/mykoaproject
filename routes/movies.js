const router = require('koa-router')()
const axios = require('axios')


router.prefix('/zyf/movies')


router.post('/nowplaying', async function (ctx, next) {
  let doudata = await axios.get('http://api.douban.com/v2/movie/nowplaying?apikey=0df993c66c0c636e29ecbb5344252a4a').then((response) => {
    return response.data
  })

  ctx.body = { code: 20000, data: doudata }

})

router.post('/comming', async function (ctx, next) {
  let doudata = await axios.get('http://api.douban.com/v2/movie/coming?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=6').then((response) => {
    return response.data
  })
  ctx.body = { code: 20000, data: doudata }

})

router.post('/detail', async function (ctx, next) {
  let data = ctx.request.body;
  let movieid = data.movieid
  let doudata = await axios.get(`https://api.douban.com/v2/movie/subject/${movieid}?apikey=0df993c66c0c636e29ecbb5344252a4a`).then((response) => {
    return response.data
  })
  ctx.body = { code: 20000, data: doudata }
})

router.post('/actorinfo', async function (ctx, next) {
  let data = ctx.request.body;
  let id = data.id
  let doudata = await axios.get(`https://api.douban.com/v2/movie/celebrity/${id}?apikey=0df993c66c0c636e29ecbb5344252a4a`).then((response) => {
    return response.data
  })
  ctx.body = { code: 20000, data: doudata }
})
router.post('/weekly', async function (ctx, next) {
  let doudata = await axios.get(`http://api.douban.com/v2/movie/weekly?apikey=0df993c66c0c636e29ecbb5344252a4a`).then((response) => {
    return response.data
  })
  ctx.body = { code: 20000, data: doudata }
})
router.post('/newmovies', async function (ctx, next) {
  let doudata = await axios.get(`http://api.douban.com/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a`).then((response) => {
    return response.data
  })
  ctx.body = { code: 20000, data: doudata }
})
router.post('/usbox', async function (ctx, next) {
  let doudata = await axios.get(`http://api.douban.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a`).then((response) => {
    return response.data
  })
  ctx.body = { code: 20000, data: doudata }
})
router.post('/top250', async function (ctx, next) {
  let data = ctx.request.body;
  let start = data.start
  let count = data.count
  let doudata = await axios.get(`http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${count}`).then((response) => {
    return response.data
  })
  ctx.body = { code: 20000, data: doudata }
})

module.exports = router
