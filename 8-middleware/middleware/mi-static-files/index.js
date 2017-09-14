const path = require('path')
const mime = require('mime')
const fs = require('mz/fs')

module.exports = function serve({ url = '/static', dir, headers, passThrough }) {
  // 异常时是继续执行其它中间件还是返回响应
  passThrough = passThrough !== false
  return async (ctx, next) => {
    let requestPath = ctx.request.path
    if (requestPath.startsWith(url)) {
      try {
        if (ctx.method !== 'HEAD' && ctx.method !== 'GET' && !passThrough) { // 不允许的方法
          ctx.status = 405
          ctx.set('Allow', 'GET, HEAD')
          return
        }
        // 读取文件
        ctx.body = await fs.readFile(path.join(dir, requestPath.substring(url.length)))
        // 设置内容类型
        ctx.set('Content-Type', mime.lookup(requestPath))
        // 添加自定义Header
        Reflect.ownKeys(headers).forEach(p => ctx.set(p, headers[p]))
      } catch (err) {
        if (passThrough) {
          await next()
        } else {
          ctx.status = 500
          if (err.code === 'ENOENT' && !passThrough) { // 文件不存在
            ctx.status = 404
          }
        }
      }
    } else {
      await next()
    }
  }
}