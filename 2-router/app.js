const Koa = require('koa')
const Router = require('koa-router')()

const app = new Koa()

app.use(async (ctx, next)=>{
  console.log(`${ctx.request.method} ${ctx.request.url}`)
  await next()
})

Router.get('/api/list/:name', async (ctx, next)=>{
  let name = ctx.params.name
  ctx.response.body = `Hello, ${name}`
})

Router.get('/', async (ctx, next)=>{
  ctx.response.body = 'Welcome to Index Page'
})

app.use(Router.routes())

app.listen(3000)