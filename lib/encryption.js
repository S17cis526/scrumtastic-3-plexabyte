"use strict";

const secret = "skfjgopisp osinb3208u9842hpoagnpovu n4qap9u8h4pa";

const algorithm = 'aes-256-ctr';

const crypto = require('crypto');

class Encryption {
  salt() {
    return crypto.randomBytes(32).toString('hex').slice(32);
  }

  digest(plaintext) {
    const hash = crypto.createHash('sha256');
    hash.update(plaintext);
    hash.update(secret);
    return hash.digest('hex');
  }

  encipher(plaintext) {
    const cipher = crypto.createCipher(algorithm, secret);
    var encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  decrypt(crypttext) {
    const decypher = crypto.createCipher(algorithm, secret);
    var decripted = decipher.update(crypttext, 'hex', 'utf8');
    deciphered += decipher.final('utf8');
    return deciphered;
  }
}
