import cr from './cr';
import Koa from 'koa';
import router from '../routers';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import log from 'koa-logger';

export default function () {
  const app = new Koa();

  app.use(log());
  app.use(cors());
  app.use(bodyParser());
  app.use(router.routes());

  const server = app.listen(cr.PORT, cr.HOST, () =>
    console.info(`Сервер запущен на ${cr.HOST}:${cr.PORT}`)
  );

  server.on('error', (e) => {
    if (e.name == 'EADDRINUSE') {
      if (process.env.NODE_ENV == 'production') {
        console.error(`Порт ${cr.PORT} занят`);
      } else {
        console.info(`Порт ${cr.PORT} занят, пробую ${(cr.PORT += 1)}`);
        server.listen(cr.PORT, cr.HOST);
      }
    }
  });
  return server;
}
