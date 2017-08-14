const Koa = require('koa')
const Router = require('koa-router')()
const BodyParser = require('koa-bodyparser')
const path = require("path")
/**
 * 自定义中间件
 */
const init = require('./middleware/init')
const miRender = require('./middleware/mi-render')
const miRouter = require('./middleware/mi-router')

const isProduction = process.env.NODE_ENV === 'production'
const app = new Koa()

app.use(init())
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
// if(!isProduction){
//   app.use(Koa_staticFiles('/static', `${__dirname}/static`))
// }

/**
 * 解析POST请求
 */
app.use(BodyParser())

app.use(miRender({
  rootControllerPath: path.resolve(__dirname, "./controller"),
  viewRootPath: path.resolve(__dirname, "./views")
}))
app.use(miRouter(require("./route")))

app.listen(3000)
console.log('app started at port 3000...');