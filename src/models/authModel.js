const mongoose = require("mongoose");
//hasing password 
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
     
      max: 20,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      max: 20,
      unique: true,
    },
    contact: {
      type: String,
      trim: true,
      required: true,
      max: 20,
    },
    address: {
      type: String,
      trim: true,
     
      max: 20,
    },
    hash_password: {
      type: String,
      trim: true,
      required: true,
      max: 20,
    },
  
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);
//https://www.npmjs.com/package/bcrypt

//for bycrypting password
userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});
userSchema.methods={
    authenticate:function(password){
        return bcrypt.compareSync(password,this.hash_password)
    }
}
module.exports = mongoose.model("User", userSchema);
