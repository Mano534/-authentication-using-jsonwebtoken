const {pakeageToSend} = require('./signMsg');
const crypto = require('crypto');
const { decryptoWithPublicKey } = require('./decrypto');
const fs = require('fs');
const publicKey =fs.readFileSync(__dirname+'/publicKey.pem');

const hashed = crypto.createHash(pakeageToSend.hash);
let hashedData = hashed.update(JSON.stringify(pakeageToSend.data));
let hashoriginalHex = hashedData.digest('hex');
let decryptedMsg = decryptoWithPublicKey(publicKey,pakeageToSend.signedMsgEncryptedData).toString();
if(decryptedMsg === hashoriginalHex){
    console.log('sucess!! the data has not been tampered with and the sender is valid')
}else{
    console.log('some one else has tried to tamper the data or some thing else happened')
}