const Product = require("../models/product");
const slugify = require("slugify");
const env = require("dotenv");

env.config();

exports.createProduct = (req, res) => {
  // res.status(200).json({file:req.files,body:req.body})
  const { name, price, category, quantity,promoCode} = req.body;
 
  let productUrl;
  if (req.file) {
    productUrl = `${process.env.BASE_URL}/public/` + req.file.filename;
  }
  const product = new Product({
    name: name,
    price: price,
    productPicture: productUrl,
    promoCode,
    category,
    quantity,
    createdBy: req.user._id,
    slug: slugify(name),
  });
  product.save((err, pro) => {
    if (err) return res.status(400).json({ err });
    if (pro) {
      return res.status(200).json({
        pro,
      });
    }
  });
};
exports.getProduct = (req, res) => {
  Product.find({}).exec((err, product) => {
    if (err)
      return res.status(400).json({
        err,
      });
    if (product) {
      return res.status(200).json({
        product,
      });
    }
  });
};
exports.getProductById = (req, res) => {
  Product.find({ category: req.query.category }).exec((err, data) => {
    if (err) return res.status(400).json({ err });
    if (data) {
      return res.status(200).json({
        data: data,
      });
    }
  });
};
exports.getSigleProduct = (req, res) => {
  Product.findById({ _id: req.query.id }).exec((err, product) => {
    if (err)
      return res.status(400).json({
        err,
      });
    if (product) {
      return res.status(200).json({
        data: product,
      });
    }
  });
};
