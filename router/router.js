const router = require('koa-router')()
const HomeController = require('../controller/home')

module.exports = (app) => {
  router.get('/', HomeController.index)
  
  router.get('/home', HomeController.home)
  
  router.get('/home/:id/:name', HomeController.homeParams)
  
  router.get('/user', HomeController.login)
  
  // 增加响应表单请求的路由
  router.post('/user/register', HomeController.register)

  router.post('/api/addinformation', HomeController.addinformation)
  
  app.use(router.routes())
    .use(router.allowedMethods())
}