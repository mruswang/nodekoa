const router = require('koa-router')()
const HomeController = require('../controller/home')

const multer = require('koa-multer')
var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) {  
    cb(null, 'public/uploads/')  
  },  
  //修改文件名称  
  filename: function (req, file, cb) {  
    var fileFormat = (file.originalname).split(".");  
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
  }  
})  
//加载配置  
var puploadimg = multer({ storage: storage });  

module.exports = (app) => {
  router.get('/', HomeController.index)

  router.get('/admin', HomeController.admin)
  
  router.get('/home', HomeController.home)
  
  router.get('/home/:id/:name', HomeController.homeParams)
  
  router.get('/user', HomeController.login)

  router.get('/upload', HomeController.upload)

  router.post('/upload',puploadimg.single('file'),  async (ctx, next) => {  
  	console.log(ctx.req.file)
	  ctx.body = {  
	    filename: ctx.req.file.filename//返回文件名  
	  }  
	})
  
  // 增加响应表单请求的路由
  router.post('/user/register', HomeController.register)

  router.post('/api/addinformation', HomeController.addinformation)
  
  router.post('/api/upload',puploadimg.single('file'),  async (ctx, next) => {  
    ctx.body={
      success:"成功",
      filename: `http://${ctx.host}/uploads/${ctx.req.file.filename}`
    }
	}) 

  app.use(router.routes())
    .use(router.allowedMethods())
}