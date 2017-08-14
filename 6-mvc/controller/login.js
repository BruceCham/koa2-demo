module.exports = {
  'POST /login': async (ctx, next) => {
    let email = ctx.request.body.email || ''
    let password = ctx.request.body.password || ''
    if (email === 'brucecham@qq.com' && password === '123456') {
      console.log('login ok!')
      ctx.render('login-ok.html', {
        title: 'Login OK',
        msg: `Welcome ${email}`
      });
    } else {
      console.log('login err!')
      ctx.render('login-err.html', {
        title: 'Login Failed',
        msg: "登录失败，请重试"
      })
    }
  }
}