import easyvk from 'easyvk';

class Easyvk {
  check(ctx: any) {
    if (ctx.username && ctx.password) {
      return easyvk({
        username: ctx.username,
        password: ctx.password,
        v: '5.107',
        reauth: true,
      });
    } else {
      return null;
    }
  }
  auth(ctx: any) {
    return easyvk({
      username: ctx.username,
      password: ctx.password,
      v: '5.107',
    });
  }
}

export default new Easyvk();
