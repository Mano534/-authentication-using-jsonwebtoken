import crypto, { verify } from 'crypto';
import { sign } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express'
import fs from 'fs';
import jsonwebtoken from 'jsonwebtoken';
export let genPassword = (password: string) => {
    let salt = crypto.randomBytes(32).toString('hex');
    let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString('hex');
    return {
        salt,
        hash: genHash
    }
}
export let validatePass = (password: string, hash: string, salt: string): boolean => {
    let hashverify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString('hex');
    return hash === hashverify;
}
export let issueToken = (user) => {
    let privateKey = fs.readFileSync(__dirname + '/../../keys/privateKey.pem', 'utf8');
    let expiresIn = '1d';
    let payload = {
        sub: user._id,
        iat: Date.now()
    }
    let jwtToken = sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
    return {
        token: "Bearer " + jwtToken,
        expires: expiresIn
    }
}
export function authmiddleware(req: Request, res: Response, next: NextFunction) {
    let publicKey = fs.readFileSync(__dirname + '/../../keys/publicKey.pem')
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer" && req.headers.authorization.split(' ')[1].match(/\S+\.\S+\.\S+/)) {
        try {
            (req as any).jwt = jsonwebtoken.verify(req.headers.authorization.split(' ')[1], publicKey, { algorithms: ['RS256'] })
            next()
        } catch (error) {
            res.status(401).json({ msg: "you cant access this route", sucess: false })
        }
    } else {
        res.status(401).json({ msg: "you cant access this route", sucess: false })
    }
}