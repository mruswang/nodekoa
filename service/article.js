const monk = require('monk')
const url = 'localhost:27017/admin';

const db = monk(url);

const collection = db.get('article')
module.exports = {
  register: async(name, pwd) => {
    let data 
      if(name == 'ikcamp' && pwd == '123456'){
        data = {
          status: 0,
          data: {
            title: "个人中心",
            content: "欢迎进入个人中心"
          }
        }
      }else{
        data = {
          status: -1,
          data: {
            title: '登录失败',
            content: "请输入正确的账号信息"
          }
        }
      }
      return data
    },
  addinformation: async(imglist,title,feng,interest,city,shequ,zan,from,fromsvalue) => {
    let data 
      collection.insert({imglist:imglist,title:title,feng:feng,interest:interest,sheng:city[0],shi:city[1],qu:city[2],shequ:shequ,zan:zan,from:from,fromsvalue:fromsvalue})
      return data = {
          status: 200 
        }
    },
  uploadimg: async(text) => {
    console.log(text)
  let data 
    
    return data = {
        status: 200 
      }
  }
}