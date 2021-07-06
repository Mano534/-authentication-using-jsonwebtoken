// import pakeages 
import express , {Request,Response,NextFunction} from "express";
// 
// import files 
import SubscribersModule from './../module/subsriber';

// global varables
let subscriber: any  ; 
// 
// interface 
// 
//cutoms middle ware functions 
let getSub =async (req:Request,res:Response,next:NextFunction)=>{
    try {
        subscriber = await SubscribersModule.findById(req.params.id);
        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({massage: error.message})
    }
}
//  
// Our Routes
const router = express.Router();

// get all
router.get("/",async (req,res)=>{
    try {
        const subs = await SubscribersModule.find({});
        res.json({massage: subs})
    } catch (error) {
        res.status(500).json({massage: error.message})
    }
})
//
// post -create sub-
router.post("/",async (req,res)=>{
    try {
        const {name,subscribedToChannel}= req.body;
        if(name&&subscribedToChannel){
            const createSub = await SubscribersModule.create({name,subscribedToChannel});
            res.json({massage: createSub})
        }
    } catch (error) {
        res.status(400).json({massage: error.message})
    }

})
//
// get -One Sub-
router.get("/:id",getSub,async (req,res)=>{
    try {
        res.json({massage: subscriber});
    } catch (error) {
        res.status(500).json({massage: error.message})
    }
})
//
// put -update sub-
router.patch("/:id",getSub,async (req,res)=>{
    let {id} = req.params
    let Obj: any= {} ; 

    console.log('body:',req.body,"id :",id)
    SubscribersModule.update({_id : id},{$set : req.body})
    .exec()
    .then((data: any)=>{
        res.json({massage: data})
    })
    .catch((err:any)=>{
        res.status(500).json({errMessage : err.message})
    })
})
//
// delete -One Sub-
router.delete("/:id",getSub,async (req,res)=>{

    try {
        const removedSub = await subscriber.remove() ;  
        res.json({massage: removedSub}) 
    } catch (error) {
        res.status(500).json({massage : error.message})
    }
})
//
// 







// export router
export default router