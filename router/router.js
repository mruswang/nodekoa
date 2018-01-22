const router = require('koa-router')()
const HomeController = require('../controller/home')
const MemberController = require('../controller/member')
const ArticleController = require('../controller/article')
const ProductController = require('../controller/product')
const ImgController = require('../controller/img-category')

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

  router.get('/member-list', MemberController.memberList)

  router.get('/member-add', MemberController.memberAdd)
  
  router.get('/article-list', ArticleController.articleList)

  router.get('/article-add', ArticleController.articleAdd)

  router.get('/article-category', ArticleController.articleCategory)

  router.get('/article-category-add', ArticleController.articleCategoryAdd)

  router.get('/product-list', ProductController.productList)

  router.get('/product-add', ProductController.productAdd)

  router.get('/product-category', ProductController.productCategory)

  router.get('/product-category-add', ProductController.productCategoryAdd)

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
  
  router.post('/admin/upload',puploadimg.single('file'),  async (ctx, next) => {  
    ctx.body={
      success:"成功",
      filename: `http://${ctx.host}/uploads/${ctx.req.file.filename}`
    }
	})
  //增加图片分类的路由 
  router.post('/admin/img-category-add', ImgController.imgCategoryAdd)

  router.get('/admin/img-category', ImgController.imgCategory)

  router.post('/admin/img-category-del', ImgController.imgCategoryDel)

  app.use(router.routes())
    .use(router.allowedMethods())
}