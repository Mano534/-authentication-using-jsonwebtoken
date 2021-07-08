const crypto = require('crypto');

const encryptWithPublic = (publicKey, msg)=>{
    let bufferMsg =   Buffer.from(msg,'utf8');
    return crypto.publicEncrypt(publicKey,bufferMsg) 
}
const encryptWithPrivate = (privateKey, msg)=>{
    let bufferMsg =   Buffer.from(msg,'utf8');
    return crypto.privateEncrypt(privateKey,bufferMsg) 
}

module.exports ={
    encryptWithPublic,
    encryptWithPrivate
} 