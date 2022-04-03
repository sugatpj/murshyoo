const Wish=require("../models/wishlist")

exports.addWishList=(req,res)=>{
    Wish.findOne({user:req.user._id}).exec((err,wish)=>{
        if (err) return res.status(400).json({ err });
        if(wish){
            const product=req.body.wishItems.product;
            const item=wish.wishItems.find((w)=>w.product==product)
            if(item){
                 Wish.updateOne(
                     {user:req.user._id},
                     {
                        $pull:{
                            wishItems:{
                              product:product
                            }
                          }
                     }
                 ).exec((err,_wish)=>{
                    if (err) return res.status(400).json({ err });
                    if (_wish) {
                      return res.status(201).json({ wish: _wish});
                    }
                 })  
            }else{
                Wish.findByIdAndUpdate(
                    {user:req.user._id},
                    {
                        $push:{
                            wishItems:req.body.wishItems
                        }
                    }
                    ).exec((err,_wish)=>{
                        if (err) return res.status(400).json({ err });
                        if (_wish) {
                          return res.status(201).json({ wish: _wish });
                        }
                    })
            }
        }
        else{
            const wish=new Wish({
                user:req.user._id,
                wishItems:[req.body.wishItems]
            });
           wish.save((err,wish)=>{
            if (err) return res.status(400).json({ err });
            if (wish) {
              return res.status(200).json({ wish });
            } 
           })
        }
    })

}