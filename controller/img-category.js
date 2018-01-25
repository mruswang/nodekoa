const imgCategoryService = require('../service/img-category')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')

module.exports = {
  imgCategoryAdd: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let {_id,parentId,name} = ctx.request.body
        let res = await imgCategoryService.imgCategoryAdd(_id,parentId,name)
        if(res.status == 200){
          ctx.body={
            status:200,
            success:"成功",
            data: ctx.request.body.params
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
  imgCategoryDel: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let {_id} = ctx.request.body
        let res = await imgCategoryService.imgCategoryDel(_id)
        if(res.status == 200){
          ctx.body={
            status:200,
            success:"成功",
            data: ctx.request.body.params
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
  imgCategory: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let res = await imgCategoryService.imgCategory()
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
  }
}