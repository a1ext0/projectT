

import sign from '../lib/sign'
import Router from 'koa-router'
const router = new Router()


router.post('/login', (ctx, next)=> {
  console.log('login '+typeof ctx.request.body.login);

  if (ctx.request.body.login) {
    ctx.body = {status: 1, token: sign.sign({login: ctx.request.body.login})}
  } else {
    ctx.body = {status: 1}
  }
})

export default router
