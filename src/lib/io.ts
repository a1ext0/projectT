import socketIo from 'socket.io';
export default function (srv: any, opts?: socketIo.ServerOptions) {
  return socketIo.listen(srv, opts);
}
