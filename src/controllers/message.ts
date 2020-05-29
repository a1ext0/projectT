import BaseController from '.'
export default class MessageController extends BaseController {
  constructor(params:any) {
    super(params);
    this.io.on('msg', this.handleMessage.bind(this))
  }
  handleMessage(){
    
  }
}
