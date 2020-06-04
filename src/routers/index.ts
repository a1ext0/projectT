import Router from 'koa-router';
import login from './login';
import messages from './messages';

const router = new Router();

router.use(login.routes());
router.use(messages.routes());

export default router;
