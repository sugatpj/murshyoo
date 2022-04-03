const express = require("express");
const { addItemToCart, getAddedItemCart, deleteCart, removeCartItem } = require("../controllers/cart");
const { requireSignin, userMiddleware } = require("../controllers/common-middleware");
const router = express.Router();

router.post('/user/cart/addtocart',requireSignin,userMiddleware,addItemToCart)
router.post('/user/cart/removecartitem',requireSignin,userMiddleware,removeCartItem)
router.get('/user/cart/getcart',requireSignin,userMiddleware,getAddedItemCart)

module.exports = router;
