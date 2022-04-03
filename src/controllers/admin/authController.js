// /https://www.npmjs.com/package/jsonwebtoken
const jwt = require("jsonwebtoken");
const User = require("../../models/authModel");
exports.singUp = (req, res) => {
  //finding email from mongoose
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        message: "email already used",
      });
    const { email, password,contact} = req.body;
    const _user = new User({
      email,
      password,
      contact,
      role:"admin"
    });
    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          // message: "something went wrong",
          err
        });
      }
      if (data) {
        return res.status(201).json({
          user: "admin created Successfully",
        });
      }
    });
  });
};
exports.singIn = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ msg:error });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id,role:user.role },
          process.env.JWT_SECRET_TOKEN,
          { expiresIn: "1h" }
        );
        const { _id,role, email} = user;
        res.status(200).json({
          token,
          user: {
            _id,
           
            role,
            email,
            
          },
        });
      } else {
        return res.status(400).json({
          message: "password is invalid",
        });
      }
    } else {
      return res.status(400).json({ message: "invalid user name" });
    }
  });
};
