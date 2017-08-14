module.exports = {
  index: async function (scope) {
    scope.title = "首页"
    scope.content = "this is testjfwopfgjwegw"
    await this.render("index")
  },
  login: async function (scope) {
    let params = this.request.body
    let name = params.name
    let password = params.password
    if (name === "brucecham" && password === "123456") {
      scope.content = "login success"
      await this.render("success")
    } else {
      scope.content = "login error"
      await this.render("error")
    }
  }
};