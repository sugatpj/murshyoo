const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",
        required:true
    },
    name:{
        type:String,
        // required:true
    },
   studentCard:{type: String },
    orderItems:[{type:Object}],
   address:{
        type:String,
        // required:true
    },
    contact:{
        type:String,
        // required:true
    }
}, { timestamps: true })
module.exports=mongoose.model("Orders",orderSchema)