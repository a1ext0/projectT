import sign from '../lib/sign'
import Router from 'koa-router'
import { rejects } from 'assert'
const router = new Router()

router.post('/login', (ctx, next)=> {
  if (ctx.request.body.ld && typeof ctx.request.body.ld == 'object') {
    let signed = sign.jwt.sign(ctx.request.body.ld)
    if (signed) {
      ctx.body = {status: 1, token: signed}
    } else {
      ctx.status = 401
      ctx.body = {status: 'Not valid login data'}
    }
  } else {
    ctx.status = 401
    ctx.body = {status: 'Expected login data'}
  }
})

router.use((ctx, next)=>{
  if (ctx.request.body.token) {
    let verified = sign.jwt.verify(ctx.request.body.token)
    if (verified) {
      next()
    } else {
      ctx.status = 401
      ctx.body = {status: 'Not valid token'}
    }
  } else {
    ctx.status = 401
    ctx.body = {status: 'Token expected'}
  }
})

router.post('/login2', (ctx, next)=> {
  console.log('login2');
  ctx.body = {status: 'success'}
  
})

export default router
