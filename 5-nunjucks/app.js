const Koa = require('koa')
// 解析post请求参数到body字段
const BodyParser = require('koa-bodyparser')
// 模板解析
const nunjucks = require('nunjucks')
// 绑定 路由和控制器
const controller = require('./middlewares/controller')

const app = new Koa()

const createEnv = (path, opts)=>{
  let autoescape = opts.autoescape === undefined ? true: opts.autoescape,
      noCache = opts.noCache || false,
      watch = opts.watch || false,
      throwOnUndefined = opts.throwOnUndefined || false,
      env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader('views', {
          noCache,
          watch
        }),
        {
          autoescape,
          throwOnUndefined
        }
      );
  if(opts.filters){
    for(let f in opts.filters){
      env.addFilter(f, opts.filters[f])
    }
  }
  return env
}

let env = createEnv('views',{
  watch: true,
  filters: {
    hex(n){
      return `0x${n.toString(16)}`
    }
  }
})
// let test = env.render('hello.html',{name: '<script>alert("小明")</script>'})
let test = env.render('layout-xcx.html',{
  header: "It's is header!",
  body: "Bia Bia Bia Bia …"
})
console.log( test )
app.use(BodyParser())
app.use(controller())

app.listen(3000)
