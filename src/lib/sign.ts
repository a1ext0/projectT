import jwt from 'jsonwebtoken';
import crypto from 'crypto-js';
import aes from 'crypto-js/aes';
import cr from './cr';

class Aes {
  encrypt(msg: string) {
    if (typeof msg == 'string') {
      try {
        return aes.encrypt(msg, cr.aes.secret).toString();
      } catch (error) {
        console.error(error);
        return null;
      }
    } else {
      console.error('Aes encrypt expects string');
      return null;
    }
  }
  decrypt(msg: string) {
    if (typeof msg == 'string') {
      try {
        return aes.decrypt(msg, cr.aes.secret).toString(crypto.enc.Utf8);
      } catch (error) {
        console.error(error);
        return null;
      }
    } else {
      console.error('Aes decrypt expects string');
      return null;
    }
  }
}

class Jwt {
  sign(msg: string | object) {
    if (typeof msg == 'string') {
      try {
        let encrypted = new Aes().encrypt(msg);
        if (typeof encrypted == 'string') {
          return jwt.sign(encrypted, cr.jwt.secret);
        } else {
          console.error('Jwt sign expects string');
          return null;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    } else if (typeof msg == 'object') {
      try {
        let encrypted = new Aes().encrypt(JSON.stringify(msg));
        if (typeof encrypted == 'string') {
          return jwt.sign(encrypted, cr.jwt.secret);
        } else {
          console.error('Jwt sign expects string');
          return null;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    } else {
      console.error('Aes encrypt expects string or object');
      return null;
    }
  }
  decode(msg: string) {
    if (typeof msg == 'string') {
      try {
        let decoded = jwt.decode(msg);
        if (typeof decoded == 'string') {
          return new Aes().decrypt(decoded);
        } else {
          console.error('Aes decrypt expects string');
          return null;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    } else {
      console.error('Jwt decode expects string');
      return null;
    }
  }
  verify(msg: string) {
    if (typeof msg == 'string') {
      try {
        let decoded = jwt.verify(msg, cr.jwt.secret);
        if (typeof decoded == 'string') {
          let dec = new Aes().decrypt(decoded);
          if (dec) {
            return JSON.parse(dec);
          }
        } else {
          console.error('Aes decrypt expects string');
          return null;
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    } else {
      console.error('Jwt decode expects string');
      return null;
    }
  }
}

export default {
  aes: new Aes(),
  jwt: new Jwt(),
};
