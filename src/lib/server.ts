import cr from './cr';
import Koa from 'koa'
import router from '../routers'
import bodyParser from 'koa-bodyparser'

let env = process.env.NODE_ENV
const app = new Koa()


app.use(bodyParser())
app.use(router.routes())

const server = app.listen(cr.PORT, cr.HOST, ()=> console.info(`Сервер запущен на ${cr.HOST}:${cr.PORT}`))

server.on('error', (e)=> {
  if (e.name == 'EADDRINUSE') {
    if (env == 'production') {
      console.error(`Порт ${cr.PORT} занят`)
    } else {
      console.info(`Порт ${cr.PORT} занят, пробую ${cr.PORT += 1}`);
      server.listen(cr.PORT, cr.HOST);
    }
  }
  console.error('---------------- Ошибка при запуске сервера ----------------')
  console.error(e)
  console.error('------------------------------------------------------------')

});

export default server;
