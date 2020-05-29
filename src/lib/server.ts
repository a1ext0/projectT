import cr from './cr';
import http from 'http'

let env = process.env.NODE_ENV

const server = http.createServer()
server.listen(cr.PORT, cr.HOST, ()=> console.info(`Сервер запущен на ${cr.HOST}:${cr.PORT}`))

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
