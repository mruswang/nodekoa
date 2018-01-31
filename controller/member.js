const MemberService = require('../service/member')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret.json')

module.exports = {
  memberAdd: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        let payload = await jwt.verify(token, secret.sign)
        if(payload.name === 'admin'){
          let {_id,name,email,pass,phone,status,vip} = ctx.request.body
          let res = await MemberService.memberAdd(_id,name,email,pass,phone,status,vip)
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
  memberDel: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let {_id} = ctx.request.body
        let res = await MemberService.memberDel(_id)
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
  memberList: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let res = await MemberService.memberList()
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
  memberDetail: async(ctx, next) => {
    const token = ctx.header.token
    if (token) {
      try {
        await jwt.verify(token, secret.sign)
        let {_id} = ctx.request.body
        let res = await MemberService.memberDetail(_id)
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
  }
}