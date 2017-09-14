module.exports = [
  {
    match: "/",
    controller: "home.index"
  },
  {
    match: "/login",
    controller: "home.login",
    method: "get"
  },
  {
    match: "/login",
    controller: "home.login2",
    method: "post"
  }
]