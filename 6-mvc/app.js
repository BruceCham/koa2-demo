const Koa = require('koa')
const Router = require('koa-router')()
const BodyParser = require('koa-bodyparser')

/**
 * 自定义中间件
 */
const Koa_controller = require('./middleware/controller')
const Koa_staticFiles = require('./middleware/staticFiles')
const Koa_templating = require('./middleware/templating')

const isProduction = process.env.NODE_ENV === 'production'
const app = new Koa()

/**
 * 记录URL以及页面执行时间
 */
app.use(async(ctx, next)=>{
  console.log(`process ${ctx.request.method} ${ctx.request.url}...`)
  let sT = new Date().getTime()
  let eT
  await next()
  eT = new Date().getTime() - sT
  ctx.response.set('X-Response-Time', `${eT}ms`)
})

/**
 * 处理静态文件
 */
if(!isProduction){
  app.use(Koa_staticFiles('/static', `${__dirname}/static`))
}

/**
 * 解析POST请求
 */
app.use(BodyParser())

/**
 * 在ctx上增加render函数来使用nunjucks
 */
app.use(Koa_templating('views',{
  noCache: !isProduction,
  watch: !isProduction
}))

/**
 * 处理URL路由
 */
app.use(Koa_controller())

app.listen(3000)
console.log('app started at port 3000...');