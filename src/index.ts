// pake age imports
import express ,{ErrorRequestHandler,Request,Response,NextFunction}from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import mongo from 'connect-mongo';
dotenv.config();
// 

// files imports
import generalRouters from './routs/index'
// 

// clear console
console.clear();
// 


// invoked varables
const Mongo_url = process.env.DATABASE_CONECTION!;
import'./config/database';

const app = express();
const sessionStore = new mongo({
    collectionName: "sessions",
    mongoUrl:Mongo_url
})
// 
// basic setup for express

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// 




// creating session 
app.use(session({
    store:sessionStore,
    secret: 'some secret',  //normally its stored in a environoment varable 
    saveUninitialized: true,
    resave: false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24
    }
}))
// 


// ------------ passport authentication ------------------ //
import "./config/passport";
app.use(passport.initialize());
app.use(passport.session())
// 


// routes
app.use('/',generalRouters  )
// 
// 


// error handler middle ware
const handler = (error:ErrorRequestHandler,req:Request,res:Response,next:NextFunction)=>{
    res.json({error:"from error handler func",massage: error.name});
}
// route for it
app.use(handler);
// 

// listening to the server
const port = process.env.PORT || 5000 ; 
app.listen(port,()=>{
    console.log('listening to port '+port)
})
// 









