const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next)=>{
  console.log('middlewares 1 start')
  console.log(`${ctx.request.method} ${ctx.request.url}`)
  await next()
  console.log('middlewares 1 end')
})

app.use(async (ctx, next)=>{
  console.log('middlewares 2 start')
  const sT = new Date().getTime()
  await next()
  const msT = new Date().getTime() - sT
  console.log(`Time:${msT} ms`)
  console.log('middlewares 2 end')
})

app.use(async (ctx, next)=>{
  console.log('middlewares 3 start')
  await next()
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>hello koa2</h1>'
  console.log('middlewares 3 end')
})

app.listen( 3000 )