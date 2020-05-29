import SocketIO from 'socket.io'
import socketioJwt from 'socketio-jwt'
import cr from '../lib/cr'
import sign from '../lib/sign'
import jwt from 'jsonwebtoken'

export default class BaseController {
  io:SocketIO.Server
  constructor(params:any) {
    this.io = params.io
    this.io.sockets.on('connection', socketioJwt.authorize({
      secret: cr.jwt.secret,
      timeout: 15000
    }))
    .on('authenticated', (socket:any)=> {
      console.log('auth');
      socket.on('chechauth', (data:any)=> {
        data = sign.decode(data.token)
        socket.emit('auth', {data: data})
      })
    })
  }
}
