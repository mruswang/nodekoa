const monk = require('monk')
const url = 'localhost:27017/admin';
const db = monk(url);

const collection = db.get('member')

let myDate = new Date();
let year = myDate.getFullYear()
let month = myDate.getMonth() +1;
let day = myDate.getDate();
let mytime=myDate.toLocaleTimeString(); 
let noetime= `${year}-${month}-${day} ${mytime}`

module.exports = {
  memberAdd: async(_id,name,email,pass,phone,status,vip) => {
    return new Promise(function(resolve) {
      if(_id === ''){
        collection.insert({name,email,pass,phone,status,vip,creatime:noetime,updatetime:''}).then((docs) => { 
          resolve(Object.assign(docs, {status:200}))
        })
      }else{
        collection.find({_id: _id}).then((docs) => { 
          collection.update({_id: _id}, {name:name,email:email,pass:pass,phone:phone,status:status,vip:vip,updatetime:noetime,creatime:docs[0].creatime}).then((docss) => { 
            resolve(Object.assign(docss, {status:200}))
          })
        })
      }
    })
  },
  memberDel: async(_id) => {
    return new Promise(function(resolve) {
      collection.remove({_id: _id}).then((docs) => { 
        resolve(Object.assign(docs, {status:200}))
      })
    })
  },
  memberList: async() => {
    return new Promise(function(resolve) {
      collection.find({},{sort:{creatime: -1}}).then((docs) => {  //{limit:5,sort:{creatime: -1}}
        resolve(Object.assign(docs, {status:200}))
      })
    })
  },
  memberDetail: async(_id) => {
    return new Promise(function(resolve) {
      collection.find({_id: _id}).then((docs) => { 
        resolve(Object.assign(docs, {status:200}))
      })
    })
  }
}