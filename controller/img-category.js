const imgCategoryService = require('../service/img-category')

module.exports = {
  imgCategoryAdd: async(ctx, next) => {
    let {_id,parentId,name} = ctx.request.body
    let res = await imgCategoryService.imgCategoryAdd(_id,parentId,name)
    if(res.status == 200){
      ctx.body={
        status:"200",
        success:"成功",
        data: ctx.request.body.params
      }
    }else{
      
    }
  },
  imgCategoryDel: async(ctx, next) => {
    let {_id} = ctx.request.body
    let res = await imgCategoryService.imgCategoryDel(_id)
    if(res.status == 200){
      ctx.body={
        status:"200",
        success:"成功",
        data: ctx.request.body.params
      }
    }else{
      
    }
  },
  imgCategory: async(ctx, next) => {
    let res = await imgCategoryService.imgCategory()
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