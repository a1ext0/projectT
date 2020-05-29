import BaseController from '.'
export default class TestController extends BaseController {
  constructor(params:any) {
    super(params);
    this.io.sockets.on('connection', async socket=> {
      socket.on('test', this.handleMessage.bind(this))
      socket.emit('test')
    });

  }
  handleMessage(this: any){
    console.log('test passed');
  }
}
