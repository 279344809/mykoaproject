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
const msgrecords = require('./routes/msgrecords')

// let WebSocket = require('ws');
// let webSocketServer = new WebSocket.Server({
//   port: 3000
// }, err => {
//   console.log('The WebSocket Server already running on: 8030');
// });


// const webSocketServer = new WebSocket.Server({app}, () => console.log('The WebSocket Server already running on: 3000'));

// // 为websocket服务器添加一个broadcast()方法
// webSocketServer.broadcast = data => {
//     // 通过遍历webSocketServer.clients，找到所有与该服务器成功建立websocket连接的客户端，发送同一条消息
//     for (const client of webSocketServer.clients) {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(data, err => console.log(`Server error: ${err}`));
//         }
//     }
// }

// webSocketServer.on('connection', ws => {
//     console.log(`Server is connected`);
//     ws.on('message', mes => {
//         console.log(`Message sent by client: ${mes}`);
//         // 接受到其中一个客户端发来的消息后，广播给所有同时连接过来的客户端
//         const data = {
//             message: mes
//         }
//         webSocketServer.broadcast(JSON.stringify(data))
//     })
// })




// const WebSocket = require("koa-websocket");
// let wsapp = WebSocket(app);
// wsapp.listen(3001)
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
      ctx.body = { code: 50000, data: 'token无效，请检查账号登录状态！' }
    } else {
      throw err;
    }
  })
})

app.use(koajwt({
  secret: 'my_token'
}).unless({
  path: [/\/users\/login/, /\/code\/getcode/, /\/users\/wxlogin/, /\/users\/register/]
}));


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(movies.routes(), movies.allowedMethods())
app.use(code.routes(), code.allowedMethods())
app.use(msgrecords.routes(), msgrecords.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


// wsapp.ws.use( (ctx, next) =>{
//   return next(ctx)
// })

// wsapp.ws.use((ctx, next) => {
//   ctx.websocket.send('Hello World');
//   ctx.websocket.on('open', (message) => {
//     console.log('open')
//     return;
//   });
//   ctx.websocket.on('message', (message) => {
//     console.log(message)
//     ctx.websocket.send(message);
//     return;
//   });
//   ctx.websocket.on('close', (message) => {
//     console.log('close')
//     return;
//   });
// });


// /* 实现简单的接发消息 */
// wsapp.ws.use((ctx, next) => {
//   // conversationList.push(Conversation(ctx));
//   /*将连接信息存入到数据库中，包括用户名，连接id，时间，消息类型,消息内容*/
//   // console.log(ctx)
//   // var message = null;
//   /*转发所有消息，客户端根据消息类型进行选择性渲染*/
//   console.log('用户连接了')
//   // ctx.websocket.send('Hello World');
//   ctx.websocket.on("message", (opt) => {
//     console.log('来消息了：on')
//     // console.log(JSON.stringify(opt))
//     ctx.websocket.send(JSON.stringify(opt));
//       // message = JSON.parse(opt);
//       // if (message.type == 'goOnline') {
//       //     conversationList.forEach((conversation, index, conversationList) => {
//       //         if (conversation.ctx.websocket._ultron.id == ctx.websocket._ultron.id) {
//       //             conversation.name = message.name;
//       //         }
//       //     })
//       // }
//       // send(opt);
//   });
//   // 下线
//   ctx.websocket.on("close", (opt) => {
//       // for (let i = 0; i < conversationList.length; i++) {
//       //     if (conversationList[i].ctx.websocket.readyState == 2 || conversationList[i].ctx.websocket.readyState == 3) {
//       //         outName = conversationList[i].name;
//       //         conversationList.splice(i, 1);
//       //         i--;
//       //     }
//       // }
//       console.log('来消息了：close')
//       console.log(opt)
//       let _opt = JSON.stringify({
//           name: outName,
//           type: 'goOutline',
//           time: new Date().toLocaleString()
//       });
//       // send(_opt);
//   });
// });



module.exports = app
