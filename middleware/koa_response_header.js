// 设置响应头的中间件
module.exports = async (ctx, next) => {
  const contentType = 'application/json; charset=utf-8'
  // 使用ctx.set设置响应头
  ctx.set('Content-Type', contentType)
  // 设置允许跨域的响应头
  // 允许所有来自不同源的请求
  ctx.set('Access-Control-Allow-Origin', '*') 
  // 允许所有来自不同源的OPTIONS, GET, PUT, POST, DELETE请求
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE') 
  await next()
}