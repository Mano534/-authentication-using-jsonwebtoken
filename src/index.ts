// pake age imports
import express ,{ErrorRequestHandler,Request,Response,NextFunction}from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
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

// basic setup for express

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
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









