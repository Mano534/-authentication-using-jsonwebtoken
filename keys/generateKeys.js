const crypto = require('crypto');
const {writeFileSync} = require('fs');
function generateKeys(){
    let keys = crypto.generateKeyPairSync('rsa',{
        modulusLength:4096,
        publicKeyEncoding:{
            format:'pem',
            type:'pkcs1'
        },
        privateKeyEncoding:{
            format:'pem',
            type:'pkcs1'
        }
    })
    writeFileSync(__dirname+'/publicKey.pem',keys.publicKey);
    writeFileSync(__dirname+'/privateKey.pem',keys.privateKey);
} 
generateKeys()
