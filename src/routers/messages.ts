import Router from 'koa-router';
const router = new Router();
import getConversations from '../lib/scripts/messages/getConversations';

router.post('/getconversations', async (ctx, next) => {
  console.log('getconversations');
  return Promise.resolve().then(async () => {
    if (ctx.request.body.token && ctx.request.body.query) {
      try {
        let res = await getConversations(
          ctx.request.body.query,
          ctx.request.body.token
        );
        ctx.body = { status: '1', res: res };
      } catch (error) {
        ctx.status = 500;
        ctx.body = { status: 'Server error' };
      }
    } else {
      ctx.status = 400;
      ctx.body = { status: 'Bad request' };
    }
  });
});

export default router;
