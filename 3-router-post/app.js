const Koa = require('koa')
const Router = require('koa-router')()
const BodyParser = require('koa-bodyparser')

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
  ctx.response.body = `
    <h1>Welcome to Index Page</h1>
    <form method="post" action="/api/login">
      <div>UserName: <input type="text" value="zlt" name="username"/></div>
      <div>PassWord: <input type="password" name="pwd"/></div>
      <button type="submit">提交</button>
    </form>
  `
})

Router.post('/api/login', async (ctx, next)=>{
  let name = ctx.request.body.username || '',
      pwd = ctx.request.body.pwd || ''
  console.log(`Signin width : ${name}, password: ${pwd}`)
  if(name == 'zlt' && pwd == '123qwe'){
    ctx.response.body = `<h1>welcome ${name}</h1>`
  }else{
    ctx.response.body = `
      <h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>
    `
  }
})

app.use(BodyParser())

app.use(Router.routes())

app.listen(3000)