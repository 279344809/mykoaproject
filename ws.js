


function wsserver() {
    let WebSocket = require('ws');

    const msgrecordsservices = require('./services/msgrecords');
    let webSocketServer = new WebSocket.Server({
        port: 3001
    }, err => {
        console.log('The WebSocket Server already running on: 3001');
    });

    // 为websocket服务器添加一个broadcast()方法
    webSocketServer.broadcast = data => {
        // 通过遍历webSocketServer.clients，找到所有与该服务器成功建立websocket连接的客户端，发送同一条消息
        for (const client of webSocketServer.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        }
    }

    webSocketServer.on('connection', ws => {
        console.log(`Server is connected`);
        ws.on('open', mes => {
            console.log('open')
            return;
        });
        ws.on('message', mes => {
            console.log(`Message sent by client: ${mes}`);
            setmsgs(mes)
            // 接受到其中一个客户端发来的消息后，广播给所有同时连接过来的客户端
        })
        ws.on('close', mes => {
            console.log('close')
            return;
        });
    })


    async function setmsgs(mes){
        let add = await msgrecordsservices.add(JSON.parse(mes))
        console.log('转发')
        console.log(add)
        if (add) {
            webSocketServer.broadcast(JSON.stringify(add))
        } else {
            console.log('服务器错误')
        }
    }

}







module.exports = wsserver
