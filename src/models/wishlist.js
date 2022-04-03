const mongoose=require('mongoose')
const wishSchema=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,ref:"User",
    required:true   
  },
  wishItems:[{
      product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
      name:{type:String,required:true},
      price:{type:Number,required:true}
  }]
},{timestamps:true})
module.exports=mongoose.model('WishList',wishSchema)