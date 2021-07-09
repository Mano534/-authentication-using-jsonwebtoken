import mongoose from 'mongoose';
// connection to database
 mongoose.connect(process.env.DATABASE_CONECTION!,{ useNewUrlParser: true , useUnifiedTopology: true})
const connection = mongoose.connection;
connection.on('error',(error)=>{
    console.log(error)
})
connection.once('open',()=>{
    console.log('connected to database')
})
// 
