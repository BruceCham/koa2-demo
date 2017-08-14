module.exports = [
  {
    match: "/",
    controller: "home.index"
  },
  {
    match: "/login/:name/:password",
    controller: "home.login",
    method: "post"
  }
]