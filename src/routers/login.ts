

import sign from '../lib/sign'
import Router from 'koa-router'
const router = new Router()


router.post('/login', (ctx, next)=> {
  if (ctx.request.body.ld && typeof ctx.request.body.ld == 'object') {
    ctx.body = {status: 1, token: sign.jwt.sign(ctx.request.body.ld)}
  } else {
    ctx.body = {status: 'Expected login data'}
  }
})

export default router
