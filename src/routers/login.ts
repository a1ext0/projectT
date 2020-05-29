import Router from 'koa-router'

const router = new Router()

router.get('/login', (ctx, next)=> {
  console.log('test http');

  ctx.body = 'test'
})

export default router
