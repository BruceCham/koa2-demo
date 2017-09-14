const Router = require('koa-router')()
const BodyParser = require('koa-bodyparser')
const path = require("path")
const ip = require("ip")

const miInit = require('./mi-init')
const miRender = require('./mi-render')
const miRouter = require('./mi-router')
const miStaticFiles = require('./mi-static-files')
const miService = require('./mi-service')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = (app) => {

  app.use(miHttpError({
    errorPageFolder: path.resolve(__dirname, '../errorPage') // 自定义错误文件夹
  }));
  
  /**
   * 记录URL以及页面执行时间
   */
  app.use(async (ctx, next) => {
    let start = Date.now()
    await next()
    let delta = Date.now() - start
    ctx.log && ctx.log.info({
      responseTime: delta
    })
  })

  /**
   * 初始化log
   */
  app.use(miLog(app.env, {
    env: app.env,
    category: 'xxxxx',
    projectName: 'node-tutorial',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }));

  /**
   * 初始化模板上下文 scope
   */
  app.use(miInit())

  /**
   * 初始化service
   */
  app.use(miService(path.resolve(__dirname, '../service')))

  /**
   * 处理静态文件
   */
  if (!isProduction) {
    app.use(miStaticFiles({
      url: '/static',
      dir: path.resolve(__dirname, "../static"),
      headers: {
        maxAge: 0
      }
    }))
  }

  /**
   * 解析POST请求
   */
  app.use(BodyParser())

  app.use(miRender({
    rootControllerPath: path.resolve(__dirname, "../controller"),
    viewRootPath: path.resolve(__dirname, "../views")
  }))

  app.use(miRouter(require("../route")))

  /**
   * 监听应用挂掉的错误处理
   */ 
  app.on("error", (err, ctx) => {
    if (ctx) {
      ctx.status = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
      ctx.status = 500
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}