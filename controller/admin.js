const adminService = require('../service/admin')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')

module.exports = {
  adminAdd: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        let payload = await jwt.verify(token, secret.sign)
        if(payload.name === 'admin'){
          let {_id,name,email,pass,phone,status} = ctx.request.body
          let res = await adminService.adminAdd(_id,name,email,pass,phone,status)
          if(res.status == 200){
            ctx.body={
              status: 200,
              success:"成功",
              data: ctx.request.body
            }
          }
        }else{
          ctx.body={
            status: 400,
            success:"你的权限不够"
          }
        }
      } catch(err) {
        ctx.body = {
          message: 'token 错误',
          status: 400
        }
      }
    } else {
      ctx.body = {
        message: 'token 错误',
        status: 400
      }
    }
  },
  adminDel: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let {_id} = ctx.request.body
        let res = await adminService.adminDel(_id)
        if(res.status == 200){
          ctx.body={
            status: 200,
            success:"成功",
            data: ctx.request.body
          }
        }
      } catch(err) {
        ctx.body = {
          message: 'token 错误',
          status: 400
        }
      }
    } else {
      ctx.body = {
        message: 'token 错误',
        status: 400
      }
    }
  },
  adminList: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let res = await adminService.adminList()
        if(res.status == 200){
          ctx.body={
            status:200,
            message:'成功',
            data: res
          }
        }
      } catch(err) {
        ctx.body = {
          message: 'token 错误',
          status: 400
        }
      }
    } else {
      ctx.body = {
        message: 'token 错误',
        status: 400
      }
    }
  },
  adminDetail: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let {_id} = ctx.request.body
        let res = await adminService.adminDetail(_id)
        if(res.status == 200){
          ctx.body={
            status: 200,
            message:'成功',
            data: res
          }
        }
      } catch(err) {
        ctx.body = {
          message: 'token 错误',
          status: 400
        }
      }
    } else {
      ctx.body = {
        message: 'token 错误',
        status: 400
      }
    }
  },
  adminPass: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let {phone,oldpass,newpass} = ctx.request.body
        let res = await adminService.adminPass(phone,oldpass,newpass)
        if(res.status == 200){
          ctx.body={
            status: 200,
            message:'成功',
            data: res
          }
        }else{
          ctx.body={
            status:400,
            message:'初始密码输入错误'
          }
        }
      } catch(err) {
        ctx.body = {
          message: 'token 错误',
          status: 400
        }
      }
    } else {
      ctx.body = {
        message: 'token 错误',
        status: 400
      }
    }
  },
  adminLogin: async(ctx, next) => {
    let {name,pass} = ctx.request.body
    let res = await adminService.adminLogin(name,pass)
    if(res.status == 200){
      let userToken = {
        name: name
      }
      const token = jwt.sign(userToken, secret.sign, {expiresIn: '2h'})  //token签名 有效期为1小时
      ctx.body = {
        status:200,
        message:'成功',
        data: token,
        name: name
      }
    }else{
      ctx.body={
        status:400,
        message:'密码输入错误'
      }
    }
  }
}