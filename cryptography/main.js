const { encryptWithPublic }  = require('./encript');
const {decryptoWithPrivateKey} = require('./decrypto')
const fs = require('fs');
// encrypt public and decrypt private === sending a hidden message
const publicKey = fs.readFileSync(__dirname+'/publicKey.pem','utf8');
let encyrptedMsg = encryptWithPublic(publicKey,'some secret Mano');
// console.log(encyrptedMsg.toString());
// encrypt private and decrypt public === signing a digitail signal --doesnt not protect the data!!--
const privateKey = fs.readFileSync(__dirname+'/privateKey.pem','utf8');
let decyrptedMsg = decryptoWithPrivateKey(privateKey,encyrptedMsg);
// console.log(decyrptedMsg.toString())