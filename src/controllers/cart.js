const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((err, cart) => {
    if (err) return res.status(400).json({ err });
    if (cart) {
      //if cart already exist update cart by quantity
      const product = req.body.cartItems.product;
      const price=req.body.cartItems.price
      const item = cart.cartItems.find((c) => c.product == product);

      if (item) {
        Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product,"cartItem.price":price },
          {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
                price:item.price+req.body.cartItems.price
              },
            },
          }
        ).exec((err, _cart) => {
          if (err) return res.status(400).json({ err });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          }
        ).exec((err, _cart) => {
          if (err) return res.status(400).json({ err });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        });
      }
    } else {
      //if cart not exist create new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      cart.save((err, cart) => {
        if (err) return res.status(400).json({ err });
        if (cart) {
          return res.status(200).json({ cart });
        }
      });
    }
  });
};
exports.getAddedItemCart=async(req,res)=>{
    Cart.findOne({user:req.user._id}).exec((err,cart)=>{
        if(err) res.status(400).json({
            err
        })
        if(cart){
            res.status(200).json({
                cart
            })
        }
    })
}

exports.removeCartItem=async(req,res)=>{
  const{product}=req.body
  if(product){
    Cart.updateOne(
    {user:req.user._id},
    {
      $pull:{
        cartItems:{
          product:product
        }
      }
    }
    ).exec((err,result)=>{
      if (err) return res.status(400).json({ err });
      if(result){
        res.status(202).json({result})
      }
    })
  }


}

