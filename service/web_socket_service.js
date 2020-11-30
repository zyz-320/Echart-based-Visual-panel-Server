const path = require('path')
// 其中的 getFileJsonData 方法可以读取文件内容并返回一个 promise 对象
const fileUtils = require('../utils/file_utils')
// 引入 WebSocket 包
const WebSocket = require('ws')


// 创建 WebSocket 服务端的对象，绑定端口号是9998
const wss = new WebSocket.Server({
  port: 9998
})
// 服务端开启了监听
module.exports.listen = () => {
  // 对客户端连接 WebSocket 服务端的事件进行监听
  // client：代表的是客户端的链接 socket 对象
  wss.on('connection', client => {
    console.log('有客户端连接成功了。。。')
    // 对客户端的连接对象进行 message 事件监听
    // msg：由客户端发给服务端的数据
    client.on('message', async msg => {
      console.log('客户端发送数据给服务端了，发送的数据是：' + msg)
      let payload = JSON.parse(msg)
      const action = payload.action // 前端发送的请求想要做什么行为
      if (action === 'getData') { // 前端发过来的请求是想要获取数据
        // 拼接出请求的数据的路径    payload.chartName -> trend hot seller rank stock map
        let filepath = '../data/' + payload.chartName + '.json'
        // 拼接绝对路径
        filepath = path.join(__dirname, filepath)
        // 读取文件内容并返回一个 promise 对象
        const ret = await fileUtils.getFileJsonData(filepath)
        // 给客户端传递过来的数据添加一个字段 data，data 对应的内容就是某个 json 文件的内容，然后再发送给客户端
        payload.data = ret
        client.send(JSON.stringify(payload))
      } else { // 前端发过来的请求是想要 进行某个图标的全屏操作 或者是 切换主体肤色
        // 原封不动的将所接收到的数据转发到每一个处于连接状态的客户端
        // wss.clients -> 一个数组，包含所有处于连接状态的客户端对象
        wss.clients.forEach(client => {
          client.send(msg)
        })
      }
      // 把数据推送给前端
      // client.send('hello socket from backend')
    })
  }) 
}


