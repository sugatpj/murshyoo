const express=require("express")
const router=express.Router()
const{requireSignin,userMiddleware}=require('../controllers/common-middleware')
const { addWishList } = require("../controllers/wishList")

router.post('/wish/addwish',requireSignin,userMiddleware,addWishList)

module.exports=router