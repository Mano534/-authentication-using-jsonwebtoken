import passport from "passport";
import strategy from 'passport-local'
const localStrategy = strategy.Strategy;
import userModel from './database';
import { validatePass } from "../lib/passwordUtiles";
passport.use(new localStrategy((username,password,done)=>{
    userModel.findOne({userName:username})
    .then((user:any)=>{
        console.log(user)
        if(!user)return done(null , false);
        let validate : boolean = validatePass(password, user.hash, user.salt);
        if(validate)return done(null,user);
        if(!validate)return done(null, false);
    })
    .catch((err:any)=>{
        return done(err)
    })
}))
passport.serializeUser((user, done)=>{
    done(null,(user as any).id)
})
passport.deserializeUser((userId,done)=>{
    userModel.findById(userId)
    .then((user:any)=>{
        done(null,user)
    })
    .catch((err:any)=>{
        done(err);
    })
})