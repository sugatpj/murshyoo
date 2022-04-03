const express = require("express");
const { requireSignin, adminMiddleware } = require("../controllers/common-middleware");
const { createProduct, getProduct, getProductById, getSigleProduct } = require("../controllers/product");
const multer=require("multer")
const router = express.Router();
const shortId=require("shortid")
const path=require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads') )
    },
    filename: function (req, file, cb) {
      
      cb(null,shortId.generate() +'-'+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


router.post('/product/create',requireSignin,adminMiddleware,upload.single('productPicture'), createProduct)
router.get('/product/getproduct',getProduct)
router.get('/product/getproductbyid',getProductById)
router.get('/product/productdetails',getSigleProduct)

module.exports = router;
