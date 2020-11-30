// 处理业务逻辑的中间件,读取某个json文件的数据
// 1，获取请求的路径，拼接文件路径
// 2，读取该路径对应文件的内容
// 3，设置响应体
const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx, next) => {
  const url = ctx.request.url // /api/seller.json => ../data/seller.json
  let filePath = url.replace('/api', '')
  filePath = '../data' + filePath + '.json'
  filePath = path.join(__dirname, filePath)
  try {
    const ret = await fileUtils.getFileJsonData(filePath)
  ctx.response.body = ret
  } catch {
    const errorMsg = {
      message: '读取文件内容失败，文件资源不存在',
      status: 404
    }
    ctx.response.body = JSON.stringify(errorMsg)
  }
  // console.log(filePath)
  await next()
}