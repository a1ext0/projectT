import SocketIO from 'socket.io'
export default class BaseController {
  io:SocketIO.Server
  constructor(params:any) {
    this.io = params.io
    this.io.sockets.on('connection', async socket=> {
      console.log('success sockets')
      socket.on('disconnect', ()=> {
        // longpoll.disconnect(lp);
      });
    });
  }
}
