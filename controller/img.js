const imgService = require('../service/img')
const imgCategoryService = require('../service/img-category')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')

module.exports = {
  imgAdd: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let {_id,name,category,imgurl,resource,collect,desc} = ctx.request.body
        let res = await imgService.imgAdd(_id,name,category,imgurl,resource,collect,desc)
        if(res.status == 200){
          ctx.body={
            status:200,
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
  imgDel: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let {_id} = ctx.request.body
        let res = await imgService.imgDel(_id)
        if(res.status == 200){
          ctx.body={
            status:200,
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
  imgList: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let res = await imgService.imgList()
        var newarr = []
        for(let value of res){
          let category_name = await imgCategoryService.imgFindCategory(value.category)
          var obj=Object.assign(value, {category_name:category_name[0].name})
          newarr.push(obj)
        }
        if(res.status == 200){
          ctx.body={
            status:200,
            message:'成功',
            data: newarr
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
  imgDetail: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let {_id} = ctx.request.body
        let res = await imgService.imgDetail(_id)
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