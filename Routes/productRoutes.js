const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.post('/add',async(req,res)=>{
    try {
        const{productName,productPrice,productUnit,productDescription}=req.body
        const productExist = await Product.findOne({productName})
        if(productExist){
            return res.status(400).json({message:"Product already exist"})
            }
            const productObj=new Product({productName,productPrice,productUnit,productDescription})
            await productObj.save()
            res.json({
                status:true,
                message:"Product added successfully"
            });
            } catch (err){
                res.json({
                    status:false,
                    message:err.message
                })
            }
    }

)

router.get('/get',async(req,res)=>
{
    try{
        const product = await Product.find();
        res.json({
            status:true,
            message:"Product retrieved successfully",
            data:product
            });
            } catch (err){
                res.json({
                    status:false,
                    message:err.message
                    })
                    

    }
})



module.exports=router;