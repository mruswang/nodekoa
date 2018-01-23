const imgService = require('../service/img')
const imgCategoryService = require('../service/img-category')

module.exports = {
  imgAdd: async(ctx, next) => {
    let {_id,name,category,imgurl,resource,collect,desc} = ctx.request.body
    let res = await imgService.imgAdd(_id,name,category,imgurl,resource,collect,desc)
    if(res.status == 200){
      ctx.body={
        success:"成功",
        data: ctx.request.body.params
      }
    }else{
      
    }
  },
  imgDel: async(ctx, next) => {
    let {_id} = ctx.request.body
    let res = await imgService.imgDel(_id)
    if(res.status == 200){
      ctx.body={
        success:"成功",
        data: ctx.request.body
      }
    }else{
      
    }
  },
  imgList: async(ctx, next) => {
    let res = await imgService.imgList()
    var newarr = []
    for(let value of res){
      let category_name = await imgCategoryService.imgFindCategory(value.category)
      var obj=Object.assign(value, {category_name:category_name[0].name})
      newarr.push(obj)
    }
    if(res.status == 200){
      ctx.body={
        status:"200",
        message:'成功',
        data: newarr
      }
    }else{
      
    }
  },
  imgDetail: async(ctx, next) => {
    let {_id} = ctx.request.body
    let res = await imgService.imgDetail(_id)
    if(res.status == 200){
      ctx.body={
        status:"200",
        message:'成功',
        data: res
      }
    }else{
      
    }
  }
}