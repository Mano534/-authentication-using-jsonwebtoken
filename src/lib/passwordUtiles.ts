import crypto, { verify } from 'crypto';
export let genPassword = (password:string)=>{
    let salt = crypto.randomBytes(32).toString('hex');
    let genHash = crypto.pbkdf2Sync(password,salt,10000,64,"sha512").toString('hex');
    return {
        salt,
        hash : genHash
    }
}
export let validatePass = (password:string, hash:string, salt:string):boolean=>{
    let hashverify = crypto.pbkdf2Sync(password,salt,10000,64,"sha512").toString('hex');
    return hash ===hashverify;
}
