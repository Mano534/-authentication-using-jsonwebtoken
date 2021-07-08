const fs =require('fs');
const jwt = require('jsonwebtoken');

let private = fs.readFileSync(__dirname+'/private.pem','utf8');
let public = fs.readFileSync(__dirname+'/public.pem','utf8');


let payload = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": 1516239022
  };

let signature = jwt.sign(payload,private,{algorithm:"RS256"});
console.log(signature);
let vertify = jwt.verify(signature,public,{algorithms:['RS256']},(err,token)=>{if(!err){console.log(true)}else{console.log(false)}});