const crypto = require('crypto');
const decryptoWithPrivateKey = (privateKey,encryptedMSG)=>{
    return crypto.privateDecrypt(privateKey,encryptedMSG);
};
const decryptoWithPublicKey = (publicKey,encryptedMSG)=>{
    return crypto.publicDecrypt(publicKey,encryptedMSG);
};
module.exports = {
    decryptoWithPrivateKey,
    decryptoWithPublicKey
}