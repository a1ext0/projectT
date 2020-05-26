//Создание префикса юзера по первой букве имени
let host:string;
let port:number;

let env = process.env.NODE_ENV

//Установка хоста и порта на дев и прод
if (env == 'production') {
  host = 'localhost';
  port = 7878;
} else {
  host = 'localhost';
  port = 7777;
}

class Credentials {
  HOST = host
  PORT = port
}

export = new Credentials
