const express = require("express");
const { singUp, singIn, getUser, userDelete } = require("../controllers/authController");
const { requireSignin, adminMiddleware } = require("../controllers/common-middleware");
const { validateSignUpRequest, isRequestedValided, validateSignInRequest } = require("../validator/auth");
const router = express.Router();


router.post("/signup",validateSignUpRequest,isRequestedValided, singUp);
router.post("/signin",validateSignInRequest,isRequestedValided, singIn);
router.get('/user/getuser',requireSignin,adminMiddleware,getUser)
router.delete('/user/:id',requireSignin,adminMiddleware,userDelete)
module.exports = router;