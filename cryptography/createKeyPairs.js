 const crypto =  require('crypto');
 const fs = require('fs');

function generateKeys(){
    let keys = crypto.generateKeyPairSync('rsa',{
        modulusLength:4096,
        publicKeyEncoding:{
            format:'pem',
            type:"pkcs1"
        },
        privateKeyEncoding:{
            format:"pem",
            type:'pkcs1'
        }
    })
    fs.writeFileSync(__dirname+'/publicKey.pem',keys.publicKey)
    fs.writeFileSync(__dirname+'/privateKey.pem',keys.privateKey)
}
generateKeys()