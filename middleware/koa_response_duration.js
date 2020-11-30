// 计算服务器消耗时长的中间件
module.exports = async (ctx, next) => {
  // 记录开始的时间
  const start = Date.now()
  // 让内层中间件开始执行
  await next()
  // 记录结束的时间
  const end = Date.now()
  // 用开始的时间减去结束的事件得到消耗的总时长
  const duration = end - start
  // 使用 ctx.set 方法设置响应头 X-Response-Time
  ctx.set('X-Response-Time', duration + 'ms')
}