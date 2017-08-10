let fn_index = async (ctx, next) => {
  ctx.response.body = `
    <h1>Welcome to Index Page</h1>
    <form method="post" action="/api/login">
      <div>UserName: <input type="text" value="zlt" name="username"/></div>
      <div>PassWord: <input type="password" name="pwd"/></div>
      <button type="submit">提交</button>
    </form>
  `
}

let fn_login = async (ctx, next) => {
  let name = ctx.request.body.username || '',
    pwd = ctx.request.body.pwd || ''
  console.log(`Signin width : ${name}, password: ${pwd}`)
  if (name == 'zlt' && pwd == '123qwe') {
    ctx.response.body = `<h1>welcome ${name}</h1>`
  } else {
    ctx.response.body = `
      <h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>
    `
  }
}

module.exports = {
  'GET /': fn_index,
  'POST /api/login': fn_login
}