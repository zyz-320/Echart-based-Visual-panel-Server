// 服务器的入口文件
// 1，创建koa的实例对象
const Koa = require('koa')
const app = new Koa()
// 2，绑定中间件
// 计算响应时间的第一层中间件
const respDurationMiddleWare = require('./middleware/koa_response_duration')
app.use(respDurationMiddleWare)
const respHeaderMiddleWare = require('./middleware/koa_response_header')
app.use(respHeaderMiddleWare)
const respDataMiddleWare = require('./middleware/koa_response_data')
app.use(respDataMiddleWare)
// 3，开启服务，绑定端口号 8888
app.listen(8888, () => {
  console.log('server is running in port 8888')
})

const webSocketService = require('./service/web_socket_service')
// 开启服务端的监听，监听客户端的连接
// 当某一个客户端连接成功之后， 就会对这个客户端进行 message 事件的监听
webSocketService.listen()

