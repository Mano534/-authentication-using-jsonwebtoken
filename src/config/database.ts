import mongoose from 'mongoose';
// connection to database
 mongoose.connect(process.env.DATABASE_CONECTION!,{ useNewUrlParser: true , useUnifiedTopology: true})
const connection = mongoose.connection
connection.on('error',(error)=>{
    console.log(error)
})
connection.once('open',()=>{
    console.log('connected to database')
})
// 
// crate Schema 
const userSchema = new mongoose.Schema({
    userName: {type:String , required :true },
    hash: {type:String , required :true },
    salt: {type:String , required :true },
    admin:{type:Boolean , required: false}
})
// 
let user: any = mongoose.model('user',userSchema)
console.log(user)
// export 
export default user
// 