const Koa = require('koa')
// 解析post请求参数到body字段
const BodyParser = require('koa-bodyparser')
// 绑定 路由和控制器
const controller = require('./middlewares/controller')

const app = new Koa()

app.use(BodyParser())
app.use(controller())

app.listen(3000)
