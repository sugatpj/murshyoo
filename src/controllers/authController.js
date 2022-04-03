// /https://www.npmjs.com/package/jsonwebtoken
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

exports.singUp = (req, res) => {
  //finding email from mongoose
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        message: "email already used",
      });
    const { name, email, contact, address, password } = req.body;
    const _user = new User({
      name,
      email,
      contact,
      address,
      password,
    });
    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          user: "user created Successfully",
        });
      }
    });
  });
};
exports.singIn = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET_TOKEN,
          
        );
        const { _id, name, role, email, address } = user;

        res.status(200).json({
          token,
          user: {
            _id,
            name,
            role,
            email,
            address,
          },
        });
      } else {
        return res.status(400).json({
          message: "password is invalid",
        });
      }
    } else {
      return res.status(400).json({ message: "something went wrong" });
    }
  });
};
exports.getUser = (req, res) => {
  User.find({}).exec((err, user) => {
    if (err)
      return res.status(400).json({
        err,
      });
    if (user) {
      
      res.status(200).json({
        user
      });
    }
  });
};
exports.userDelete=(req,res)=>{
  User.findByIdAndDelete({_id:req.params.id}).exec((err,result)=>{
    if(err) return res.status(400).json({
      err
    })
    if(result) return res.status(200).json({
      "message":"user has been deleted"
    })
  })
}