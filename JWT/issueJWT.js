let base64Url = require('base64url');
let crypto = require('crypto');
let signatureFun = crypto.createSign('RSA-SHA256');
let viertifyFun = crypto.createVerify('RSA-SHA256')
let fs = require('fs');
// signature
let headerObj = {
    "alg": "RS256",
    "typ": "JWT"
  };
let payload = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": 1516239022
  };
let base64UrlHeader = base64Url(JSON.stringify(headerObj))
let base64UrlPayload = base64Url(JSON.stringify(payload))

signatureFun.write(base64UrlHeader+'.'+base64UrlPayload);
signatureFun.end();

let privateKey = fs.readFileSync(__dirname+'/private.pem','utf8');
let signatureBase64 = signatureFun.sign(privateKey,'base64');
let signatureBase64url = base64Url.fromBase64(signatureBase64);

console.log(signatureBase64url);



//  verify 
let jwt ='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA';
const jwtParts = jwt.split('.');
// let part1 = base64Url.decode(jwtParts[0]);
// let part2 = base64Url.decode(jwtParts[1]);
// let part3 = base64Url.decode(jwtParts[2]);
let part1 = jwt.split('.')[0];
let part2 = jwt.split('.')[1];
let part3 = jwt.split('.')[2];
viertifyFun.write(part1+'.'+part2);
viertifyFun.end();

let jwtSignatureBase64 = base64Url.toBase64(part3);
console.log(part2)
const publicKey = fs.readFileSync(__dirname+'/public.pem','utf8')
let signatureValidate = viertifyFun.verify(publicKey,jwtSignatureBase64,'base64');
console.log(signatureValidate);