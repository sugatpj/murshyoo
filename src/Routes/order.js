const express = require("express");
const multer=require("multer")
const { requireSignin, userMiddleware } = require("../controllers/common-middleware");
const router = express.Router();
const shortId=require("shortid")
const path=require("path");
const { createOrder, getOrder } = require("../controllers/order");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(path.dirname(__dirname),'uploads') )
  },
  filename: function (req, file, cb) {
    
    cb(null,shortId.generate() +'-'+file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/order/createorder',requireSignin,userMiddleware ,upload.single('studentPicture'),createOrder)
router.get("/order/getorder",getOrder)
module.exports = router;
