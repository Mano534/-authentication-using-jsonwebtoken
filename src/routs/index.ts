import {Router, Request,Response,NextFunction} from "express"
let router = Router();
import passport from 'passport';
// import { isAuth } from './routsCustomMiddleWares';
import {issueToken,validatePass,genPassword,authmiddleware} from './../lib/Utiles'
import users from "./../module/users";
/**
 * -------------- POST ROUTES ----------------
 */

 // TODO
 router.post('/login', (req,res,next)=>{
        users.findOne({userName:req.body.username})
        .then(user=>{
            if(!user){res.json({sucess:false,msg:'User Not Found'})}
            let validate= validatePass(req.body.password,user.hash,user.salt);
            if(validate){
                let token = issueToken(user);
                res.json({success:true,token:token.token,user,expiresIn:token.expires})
            }else{
                res.status(401).json({sucess:false,msg:'sorry you entered a wrong pass'})
            }
        })
        .catch(err=>{
            next(err)
        })
 });
 router.post('/register', (req,res,next)=>{
     let {hash,salt}=genPassword(req.body.password);
    let newuser = new users({userName:req.body.username,hash,salt})
    .save()
    .then(user=>{
        let token = issueToken(user);
        res.json({success:true,token:token.token,user,expiresIn:token.expires})
    })
    .catch(err=>{
        next(err)
    })
});
 // TODO.

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 * 
 * Also, look up what behaviour express session has without a maxage set
 */
router.get('/protected-route',authmiddleware, (req, res, next) => {
    console.log((req as any).jwt);
    // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
    res.json({sucess:true,msg:'your here yay!!'})
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

export default router;