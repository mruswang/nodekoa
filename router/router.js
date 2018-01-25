const router = require('koa-router')()
const fs = require('fs')
const HomeController = require('../controller/home')
const MemberController = require('../controller/member')
const ArticleController = require('../controller/article')
const ProductController = require('../controller/product')
const ImgCategoryController = require('../controller/img-category')
const ImgController = require('../controller/img')
const AdminController = require('../controller/admin')

const multer = require('koa-multer')


let myDate = new Date();
let year = myDate.getFullYear()
let month = myDate.getMonth() +1;
let day = myDate.getDate();
let noetime= `${year}-${month}-${day}`

var storage = multer.diskStorage({  
  //文件保存路径  
  destination: function (req, file, cb) { 
    fs.exists(`public/uploads/${noetime}`, function (exists) {
      if(!exists){
        fs.mkdir(`public/uploads/${noetime}`,function(){
          cb(null, `public/uploads/${noetime}/`)
        })
      }else{
        cb(null, `public/uploads/${noetime}/`)
      }
    })
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
  
  // 增加图片上传
  router.post('/admin/upload',puploadimg.single('file'),  async (ctx, next) => {  
    ctx.body={
      success:"成功",
      filename: `http://${ctx.host}/uploads/${noetime}/${ctx.req.file.filename}`
    }
	})
  //增加图片分类的路由 
  router.post('/admin/img-category-add', ImgCategoryController.imgCategoryAdd)

  router.get('/admin/img-category', ImgCategoryController.imgCategory)

  router.post('/admin/img-category-del', ImgCategoryController.imgCategoryDel)

  //增加图片路由
  router.post('/admin/img-add', ImgController.imgAdd)

  router.post('/admin/img-detail', ImgController.imgDetail)

  router.get('/admin/img-list', ImgController.imgList)

  router.post('/admin/img-del', ImgController.imgDel)

  //增加管理员
  router.post('/admin/admin-add', AdminController.adminAdd)

  router.get('/admin/admin-list', AdminController.adminList)

  router.post('/admin/admin-detail', AdminController.adminDetail)

  router.post('/admin/admin-del', AdminController.adminDel)

  router.post('/admin/admin-pass', AdminController.adminPass)

  router.post('/admin/admin-login', AdminController.adminLogin)

  app.use(router.routes())
    .use(router.allowedMethods())
}