import mongoose from 'mongoose';
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