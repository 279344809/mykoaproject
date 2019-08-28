const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koajwt = require('koa-jwt');

const index = require('./routes/index')
const users = require('./routes/users')
const movies = require('./routes/movies')
const code = require('./routes/code')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = { code: 50000, data: 'token无效，请检查账号登录状态！'}
    } else {
      throw err;
    }
  })
})

app.use(koajwt({
  secret: 'my_token'
}).unless({
  path: [/\/users\/login/,/\/code\/getcode/,/\/users\/wxlogin/,/\/users\/register/]
}));


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(movies.routes(), movies.allowedMethods())
app.use(code.routes(), code.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
