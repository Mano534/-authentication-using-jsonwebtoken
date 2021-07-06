// import pakeages 
import mongoose from 'mongoose';
// 
// crate Schema 
const subscribers = new mongoose.Schema({
    name : {type: String , required: true},
    subscribedToChannel : {required: true , type:String },
    subscribedDate : {type: Date, required : true, default: Date.now}
})
// 


// export 
export default mongoose.model('subscriber',subscribers);
// 