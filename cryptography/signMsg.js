const {encryptWithPrivate} = require('./encript')
const crypto = require('crypto')
const  hash = crypto.createHash('sha256');
const fs = require('fs')
const myData = {
    username: 'mano',
    socialSecturityNumber :'No NO No!! no personal info here pls'
}
let mydata = JSON.stringify(myData);
 hash.update(mydata);
let msgHashedHexed = hash.digest('hex');
const privateKey = fs.readFileSync(__dirname+'/privateKey.pem','utf8');
let cryptedData = encryptWithPrivate(privateKey,msgHashedHexed);
const pakeageToSend = {
    data: myData,
    hash: 'sha256',
    signedMsgEncryptedData: cryptedData,
}
module.exports = {
    pakeageToSend
}