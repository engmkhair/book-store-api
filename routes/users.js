const express=require('express')
const router=express.Router()
const bcrypt=require("bcryptjs")
const asyncHandler=require("express-async-handler")
const {validateUpdateUser, User}=require("../models/user")
const {verifyTokenAndAuthrization, verifyTokenAndAdmin}=require("../middleware/verifyToken")
/**
 *  @desc Update user
 *  @route /api/users/:id
 *  @method Put
 *  @access private
 */  
 
router.put("/:id",verifyTokenAndAuthrization,asyncHandler(async(req,res)=>{
   
const {error}=validateUpdateUser(req.body)
if(error)
{
    return res.status(400).json({message:error.details[0].message})
}
//console.log(req.headers)
if(req.body.password)
{
   const salt= await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password,salt)
}
const updatedUser=await User.findByIdAndUpdate(req.params.id,{
    $set:{
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
    }
},{new:true}).select("-password")
res.status(200).json(updatedUser)
}))

/**
 *  @desc Get All user
 *  @route /api/users
 *  @method get
 *  @access private (only admin)
 */  
 
router.get("/",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
    const users=await User.find()  
    res.status(200).json(users)
    }))
    
/**
 *  @desc Get user by Id
 *  @route /api/users/:id
 *  @method get
 *  @access private (only admin  user himself)
 */  
 
router.get("/:id",verifyTokenAndAuthrization,asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id) 
    if(user){
        res.status(200).json(user)
    } else {
        res.status(404).json({message:"user not found"})
    }
    
    }))
    /**
 *  @desc delete user 
 *  @route /api/users/:id
 *  @method delete
 *  @access private (only admin  user himself)
 */  
 
router.delete("/:id",verifyTokenAndAuthrization,asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id) 
    if(user){
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"user has been deleted"})
    } else {
        res.status(404).json({message:"user not found"})
    }
    
    }))
module.exports=router