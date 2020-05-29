import jwt from 'jsonwebtoken'
import crypto from 'crypto-js'
import aes from 'crypto-js/aes'
import cr from './cr'

class Aes {
  encrypt(msg:string|CryptoJS.LibWordArray){
    let i = aes.encrypt(msg, 'test')
    console.log(`dec: ${aes.decrypt(i, 'test')}`);
    return aes.encrypt(msg, cr.aes.secret)
  }
  decrypt(msg:string|CryptoJS.WordArray){
    return aes.decrypt(msg, cr.aes.secret)
  }
}

function sign (msg:any) {
  console.log(`msg1 = ${msg.login}`);

  msg.login = new Aes().encrypt(JSON.stringify(msg)).toString()

  console.log(`msg2 = ${msg.login}`);
  console.log(`msg3 = ${jwt.sign(msg, cr.jwt.secret)}`);
  return jwt.sign(msg, cr.jwt.secret)
}

function decode (msg:any) {
  console.log(`msg4 = ${msg}`);
  msg = jwt.decode(msg)
  console.log(`msg5 = ${msg.login}`);
  msg = new Aes().decrypt(msg.login).toString(crypto.enc.Utf8)
  console.log(`msg6 = ${msg}`);
  return msg
}

export default {
  aes: new Aes(),
  sign: sign,
  decode: decode
}
