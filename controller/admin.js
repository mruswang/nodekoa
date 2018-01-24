const adminService = require('../service/admin')

module.exports = {
  adminAdd: async(ctx, next) => {
    let {_id,name,email,pass,phone,status} = ctx.request.body
    let res = await adminService.adminAdd(_id,name,email,pass,phone,status)
    if(res.status == 200){
      ctx.body={
        status:"200",
        success:"成功",
        data: ctx.request.body
      }
    }else{
      ctx.body={
        status:"400",
        success:"你的权限不够"
      }
    }
  },
  adminDel: async(ctx, next) => {
    let {_id} = ctx.request.body
    let res = await adminService.adminDel(_id)
    if(res.status == 200){
      ctx.body={
        status:"200",
        success:"成功",
        data: ctx.request.body
      }
    }else{
      
    }
  },
  adminList: async(ctx, next) => {
    let res = await adminService.adminList()
    if(res.status == 200){
      ctx.body={
        status:"200",
        message:'成功',
        data: res
      }
    }else{
      
    }
  },
  adminDetail: async(ctx, next) => {
    let {_id} = ctx.request.body
    let res = await adminService.adminDetail(_id)
    if(res.status == 200){
      ctx.body={
        status:"200",
        message:'成功',
        data: res
      }
    }else{
      
    }
  },
  adminPass: async(ctx, next) => {
    let {phone,oldpass,newpass} = ctx.request.body
    let res = await adminService.adminPass(phone,oldpass,newpass)
    if(res.status == 200){
      ctx.body={
        status:"200",
        message:'成功',
        data: res
      }
    }else{
      ctx.body={
        status:"400",
        message:'初始密码输入错误'
      }
    }
  }
}