module.exports = {
  async login(params){
    return Object.assign(params, {
      status: 0
    })
  }
}