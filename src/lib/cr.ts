import secret from './secret'

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

class Database {
  user = 'postgres'
  host = 'localhost'
  database = 'projectT'
  password = secret.dbpassword
  port = 5432
}

class Jwt {
  secret = secret.jwtSecret
  expires = 60*60
}

class Aes {
  secret = secret.aesSecret
}


class Credentials {
  HOST = host
  PORT = port
  db = new Database
  jwt = new Jwt
  aes = new Aes
}

export = new Credentials
