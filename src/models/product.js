const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    promoCode: {
      type: String,
    },
    productPicture:{type: String,required:true}
    ,
    quantity:{
        type:Number,
        
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true },
    review: [
      { 
        userId:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
       review: String
     },
    ],
    category: {type:mongoose.Schema.Types.ObjectId, ref: "User",required:true},
    upDateAt: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
