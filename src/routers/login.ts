import sign from '../lib/sign';
import Router from 'koa-router';
import vk from '../lib/vk';
const router = new Router();

router.post('/login', async (ctx, next) => {
  if (ctx.request.body.ld && typeof ctx.request.body.ld == 'object') {
    let vkr = vk.check(ctx.request.body.ld);
    if (vkr) {
      try {
        let vka = await vkr;

        let signed = sign.jwt.sign(ctx.request.body.ld);
        if (signed) {
          ctx.body = { status: 1, token: signed };
        } else {
          ctx.status = 401;
          ctx.body = { status: 'Not valid login data' };
        }
      } catch (error) {
        ctx.status = 401;
        ctx.body = { status: 'Wrong login or password' };
      }
    } else {
      ctx.status = 401;
      ctx.body = { status: 'Not valid login data' };
    }
  } else {
    ctx.status = 401;
    ctx.body = { status: 'Expected login data' };
  }
});

router.use(async (ctx, next) => {
  if (ctx.request.body.token) {
    let verified = sign.jwt.verify(ctx.request.body.token);
    if (verified) {
      ctx.request.body.token = verified;
      await next();
    } else {
      ctx.status = 401;
      ctx.body = { status: 'Not valid token' };
    }
  } else {
    ctx.status = 401;
    ctx.body = { status: 'Token expected' };
  }
});

export default router;
