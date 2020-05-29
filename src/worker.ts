import server from './lib/server'
import initSocket from './lib/io'
import TestController from './controllers/test'
//Инициализация сокета
const io = initSocket(server)

//Передача экземпляра сокета для инициализации контроллера
new TestController({io})
