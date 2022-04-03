const Category=require('../models/category')
const slugify=require('slugify');
const res = require('express/lib/response');
exports.addCategory=(req,res)=>{
    const categoryObj={
        name:req.body.name,
        slug:slugify(req.body.name),
    }
    if(req.body.parentId){
        categoryObj.parentId=req.body.parentId
    }
    const cat=new Category(categoryObj)
    cat.save((err,categoryy)=>{
        if(err) return res.status(400).json({
            err
        })
        if(categoryy){
            return res.status(201).json({
                categoryy
            })
        }
    })
}
exports.getCategories=(req,res)=>{
Category.find({}).exec((err,cat)=>{
    if(err) return res.status(400).json({
        err
    })
    if(cat){
        res.status(200).json({
            cat
        })
    }
})
}