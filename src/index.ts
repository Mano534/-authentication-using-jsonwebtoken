// pake age imports
import express ,{ErrorRequestHandler,Request,Response,NextFunction}from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import mongo from 'connect-mongo';
dotenv.config();
// 
// files imports
import subscribersRouter from './routs/subscribers';
// 

// clear console
console.clear();
// 

// invoked varables
const Mongo_url = process.env.DATABASE_CONECTION!;
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



// connection to database
let connectionWithMongoose = mongoose.connect(Mongo_url,{ useNewUrlParser: true , useUnifiedTopology: true})
const connection = mongoose.connection
connection.on('error',(error)=>{
    console.log(error)
})
connection.once('open',()=>{
    console.log('connected to database')
})
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






// routes
app.get('/',(req: any,res)=>{
    if(req.session.viewCount){
        req.session.viewCount++
    }else{
        req.session.viewCount = 1
    }
    console.log(req.session)
    res.send('this page has been view'+ req.session.viewCount +' times')
})
// app.use('/subscribers',subscribersRouter)
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









