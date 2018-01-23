const monk = require('monk')
const url = 'localhost:27017/admin';
const db = monk(url);

const collection = db.get('img')

let myDate = new Date();
let year = myDate.getFullYear()
let month = myDate.getMonth() +1;
let day = myDate.getDate();
let mytime=myDate.toLocaleTimeString(); 
let noetime= `${year}-${month}-${day} ${mytime}`

module.exports = {
  imgAdd: async(_id,name,category,imgurl,resource,collect,desc) => {
    return new Promise(function(resolve) {
      if(_id === ''){
        collection.insert({name,category,imgurl,resource,collect,desc,creatime:noetime,updatetime:''}).then((docs) => { 
          resolve(Object.assign(docs, {status:200}))
        })
      }else{
        collection.find({_id: _id}).then((docs) => { 
          collection.update({_id: _id}, {name:name,category:category,imgurl:imgurl,resource:resource,collect:collect,updatetime:noetime,desc:desc,creatime:docs[0].creatime}).then((docss) => { 
            resolve(Object.assign(docss, {status:200}))
          })
        })
      }
    })
  },
  imgDel: async(_id) => {
    return new Promise(function(resolve) {
      collection.remove({_id: _id}).then((docs) => { 
        resolve(Object.assign(docs, {status:200}))
      })
    })
  },
  imgList: async() => {
    return new Promise(function(resolve) {
      collection.find({}).then((docs) => { 
        resolve(Object.assign(docs, {status:200}))
      })
    })
  },
  imgDetail: async(_id) => {
    return new Promise(function(resolve) {
      collection.find({_id: _id}).then((docs) => { 
        resolve(Object.assign(docs, {status:200}))
      })
    })
  }
}