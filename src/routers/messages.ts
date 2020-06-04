import Router from 'koa-router'
const router = new Router()

router.post('/getconversations', async ctx => {
    console.log('getconversations');
    if (ctx.request.body.token) {
        
        ctx.body = {status: 'success'}
    }
    
  })

export default router