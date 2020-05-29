import Router from 'koa-router'
import login from './login'

const router = new Router()

router.use(login.routes())

export default router
