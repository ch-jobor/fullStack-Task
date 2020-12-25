const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

router.prefix('/api');

router.post('/user', async (ctx) => {
  let code, msg;
  const {header, body} = ctx.request;

  if(!header.role || header.role !== 'admin') {
    code = 401;
    msg = 'unauthorized post';
    ctx.body = {
      code, 
      msg
    }
  } else if(!body.name || !body.email) {
    code = 404;
    msg = 'name 或 email 不得为空';
    ctx.body = {
      code, 
      msg
    }
  } else {
    code = 200;
    msg = "上传成功";
    ctx.body = {
      code, 
      data: {
        ...body
      },
      msg
    }
  }
})

app.use(koaBody())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);