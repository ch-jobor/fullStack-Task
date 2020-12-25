/**
 * 【作业】
  通过header里面传递一个role属性admin，使用post请求，发送给koa这边的/api/user接口
  json数据为{name: "imooc", email: "imooc@test.com"}。
  
  [情景一]无name或者email
    response 数据：
    code = 404
    msg = 'name 或 email 不得为空'

  [情景二]Header中无role或者role不等于admin
    response 数据：
    code = 401
    msg = 'unauthorized post'
  
  [情景三]正常请求
    code = 200
    msg = "上传成功"
    data = 请求数据

  1. koa侧判断role属性是否存在，是否是admin，不是，则返回status 401
  2. 判断email与name属性是否存在，并且不为空字符串
  3. 返回用户上传的数据，封装到data对象中，给一个code： 200，message： '上传成功'。
 */

const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

router.prefix('/api');

router.post('/user', async (ctx) => {
  let code, msg;
  let isSuccess = false;
  const {header, body} = ctx.request;

  if(!header.role || header.role !== 'admin') {
    code = 401;
    msg = 'unauthorized post'
  } else if(!body.name || !body.email) {
    code = 404
    msg = 'name 或 email 不得为空'
  } else {
    isSuccess = true;
    code = 200;
    msg = "上传成功";
  }

  if(isSuccess) {
    ctx.body = {
      code, 
      data: {
        ...body
      },
      msg
    }
  } else {
    ctx.body = {
      code, 
      msg
    }
  }
})

app.use(koaBody())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);