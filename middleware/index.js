const path = require('path')
const ip = require('ip')
const bodyParser = require('koa-bodyparser')
const jwtKoa = require('koa-jwt')
const secret = 'mruswang'
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const miLong = require('./mi-log')
const miSend = require('./mi-send')
module.exports = (app) => {
  app.use(staticFiles(path.resolve(__dirname, "../public")))
  // app
  //   .use(jwtKoa({secret}).unless({
  //       path: [/^\/admin\/admin-login/] //数组中的路径不需要通过jwt验证
  //   }))
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }));
  app.use(miLong({
    env: app.env,  // koa 提供的环境变量
    projectName: 'nodekoa',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))
  app.use(bodyParser())
  app.use(miSend())
}