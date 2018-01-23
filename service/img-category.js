const monk = require('monk')
const url = 'localhost:27017/admin';

const db = monk(url);

const collection = db.get('imgCategory')

module.exports = {
  imgCategoryAdd: async(_id,parentId,name) => {
    return new Promise(function(resolve) {
      if(_id === ''){
        collection.insert({parentId: parentId,name: name}).then((docs) => { 
          resolve(Object.assign(docs, {status:200}))
        })
      }else{
        collection.update({_id: _id}, {parentId: parentId,name: name}).then((docs) => { 
          resolve(Object.assign(docs, {status:200}))
        })
      }
    })
  },
  imgCategoryDel: async(_id) => {
    return new Promise(function(resolve) {
      collection.remove({_id: _id}).then((docs) => { 
        resolve(Object.assign(docs, {status:200}))
      })
    })
  },
  imgCategory: async() => {
    return new Promise(function(resolve) {
      collection.find({}).then((docs) => { 
        resolve(Object.assign(docs, {status:200}))
      })
    })
  },
  imgFindCategory: async(_id) => {
    return new Promise(function(resolve) {
      collection.find({_id: _id}).then((docs) => { 
        resolve(Object.assign(docs))
      })
    })
  }
}