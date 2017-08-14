module.exports = {
  index: function* (scope) {
    scope.title = "首页"
    scope.content = "this is testjfwopfgjwegw"
    yield this.render("index")
  },
  login: function* (scope) {
    let name = this.params.name
    let password = this.params.password
    if (name === "brucecham" && password === "123456") {
      scope.content = "login success"
      yield this.render("success")
    } else {
      scope.content = "login error"
      yield this.render("error")
    }
  }
};