const monk = require('monk')
const url = 'localhost:27017/admin';
const db = monk(url);

const collection = db.get('admin')

let myDate = new Date();
let year = myDate.getFullYear()
let month = myDate.getMonth() +1;
let day = myDate.getDate();
let mytime=myDate.toLocaleTimeString(); 
let noetime= `${year}-${month}-${day} ${mytime}`

module.exports = {
  adminAdd: async(_id,name,email,pass,phone,status) => {
    return new Promise(function(resolve) {
      if(_id === ''){
        collection.insert({name,email,pass,phone,status,creatime:noetime,updatetime:''}).then((docs) => { 
          resolve(Object.assign(docs, {status:200}))
        })
      }else{
        collection.find({_id: _id}).then((docs) => { 
          collection.update({_id: _id}, {name:name,email:email,pass:pass,phone:phone,status:status,updatetime:noetime,creatime:docs[0].creatime}).then((docss) => { 
            resolve(Object.assign(docss, {status:200}))
          })
        })
      }
    })
  },
  adminDel: async(_id) => {
    return new Promise(function(resolve) {
      collection.remove({_id: _id}).then((docs) => { 
        resolve(Object.assign(docs, {status:200}))
      })
    })
  },
  adminList: async() => {
    return new Promise(function(resolve) {
      collection.find({},{sort:{creatime: -1}}).then((docs) => {  //{limit:5,sort:{creatime: -1}}
        resolve(Object.assign(docs, {status:200}))
      })
    })
  },
  adminDetail: async(_id) => {
    return new Promise(function(resolve) {
      collection.find({_id: _id}).then((docs) => { 
        resolve(Object.assign(docs, {status:200}))
      })
    })
  },
  adminPass: async(phone,oldpass,newpass) => {
    return new Promise(function(resolve) {
      collection.find({phone: phone}).then((docs) => { 
        if(docs[0].pass !== oldpass){
          resolve({status:400})
        }else{
          collection.update({phone: phone}, {name:docs[0].name,email:docs[0].email,pass:newpass,phone:phone,status:docs[0].status,updatetime:noetime,creatime:docs[0].creatime}).then((docss) => { 
            resolve(Object.assign(docss, {status:200}))
          })
        }
      })
    })
  },
  adminLogin: async(name,pass) => {
    return new Promise(function(resolve) {
      collection.find({name: name}).then((docs) => { 
        if(docs[0].pass !== pass){
          resolve({status:400})
        }else{
          resolve(Object.assign(docs, {status:200}))
        }
      })
    })
  }
}