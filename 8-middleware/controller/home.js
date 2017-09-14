module.exports = {
  index: async function(scope){
    Object.assign(scope,{
      title: "iKcamp教程"
    })
    await this.render("index")
  },
  login: async function(scope){
    Object.assign(scope,{
      title: "请登录账号"
    })
    await this.render("login")
  },
  login2: async function(scope){
    let params = this.request.body
    let name = params.name
    let password = params.password
    if (name === "ikcamp" && password === "123456") {
      let test = await this.service.home.login({
        name,
        password
      })
      Object.assign(scope,{
        title: "登录成功",
        content: "欢迎进入个人中心"
      },test)
      await this.render("success")
    } else {
      Object.assign(scope,{
        title: "登录失败",
        content: "请检查登录信息是否正常"
      })
      await this.render("login")
    }
  }
};