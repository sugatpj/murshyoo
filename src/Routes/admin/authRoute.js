const express = require("express");
const { singUp, singIn } = require("../../controllers/admin/authController");
const { validateSignInRequest, isRequestedValided, adminValidateSignUpRequest } = require("../../validator/auth");
const router = express.Router();


router.post("/admin/signup",adminValidateSignUpRequest,isRequestedValided, singUp);
router.post("/admin/signin",validateSignInRequest,isRequestedValided, singIn);

module.exports = router;
