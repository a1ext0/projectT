import SocketIO from 'socket.io'
import socketioJwt from 'socketio-jwt'
import secret from '../lib/secret'
export default class BaseController {
  io:SocketIO.Server
  constructor(params:any) {
    this.io = params.io
    this.io.sockets.on('connection', socketioJwt.authorize({
      secret: secret.jwtsecret,
      timeout: 15000
    }))
    .on('authenticated', (socket:any)=> {
      console.log('Name ' + socket.decoded_token.name);
      socket.on('lol', ()=> {
        console.log('lol');
      })
    }).on('lo2l', ()=> {
      console.log('lol');

    })
  }
}
