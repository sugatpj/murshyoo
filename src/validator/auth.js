const { check, validationResult } = require("express-validator");

exports.validateSignUpRequest = [
  check("name").notEmpty().withMessage("Name is required"),

  check("email").isEmail().withMessage("Email is required"),

  check("contact").notEmpty().withMessage("contact is required"),

  check("address").notEmpty().withMessage("Address is required"),

  check("password").isLength({min:6}).withMessage("Password must be at least 6 character long"),
];
exports.adminValidateSignUpRequest = [
    
  
    check("email").isEmail().withMessage("Email is required"),
  
    check("contact").notEmpty().withMessage("contact is required"),
  
   
  
    check("password").isLength({min:6}).withMessage("Password must be at least 6 character long"),
  ];
exports.validateSignInRequest = [
  
  
    check("email").isEmail().withMessage("Email is required"),
    check("password").notEmpty().withMessage("Password must be at least 6 character long"),
  ];
exports.isRequestedValided = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  next();
};
