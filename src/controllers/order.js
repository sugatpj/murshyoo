const Order = require("../models/order");

const env = require("dotenv");

env.config();

exports.createOrder = async (req, res) => {
  const { name, address, contact } = req.body;
  let studentUrl;
  if (req.file) {
    studentUrl = `${process.env.BASE_URL}/public/` + req.file.filename;
  }
  const order = new Order({
    user: req.user._id,
    name,
    orderItems: [req.body.orderItems],
    studentCard: studentUrl,
    contact,
    address,
  });
  order.save((err, orders) => {
    if (err) return res.status(400).json({ error: err });
    if (orders) {
      return res.status(200).json({
        message: orders,
      });
    }
  });
};
exports.getOrder = (req, res) => {
  Order.find({}).exec((err, orders) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (orders) {
      return res.status(200).json({
        data: orders,
      });
    }
  });
};
