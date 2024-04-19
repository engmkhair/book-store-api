const asyncHandler=require("express-async-handler")
const bcrypt=require("bcryptjs")


 const{User,validateRigesterUser,validateLoginUser,validateUpdateUser}=require("../models/user")
//register
/**
 * @desc...register new user
 * @route .../api/auth/register
 * @method post
 * @access  public
 */
const register=asyncHandler(async(req,res)=>{
    const {error}=validateRigesterUser(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({message:"this user already registered ! "})
    }
    const salt=await bcrypt.genSalt(10)
    req.body.password=await bcrypt.hash(req.body.password,salt)
    //if not exist
    user=new User({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        
    })
    const result=await user.save()
    const token=user.generateToken()
    const {password , ...other}=result._doc
    res.status(201).json({token,...other})
    })

    //login
/**
 * @desc...Login user
 * @route .../api/auth/register
 * @method post
 * @access  public
 */
const login=asyncHandler(async(req,res)=>{
    const {error}=validateLoginUser(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    let user=await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({message:"invalid email or password ! "})
    }
    const isPasswordMatch=await bcrypt.compare(req.body.password,user.password)
    if(!isPasswordMatch){
        return res.status(400).json({message:"invalid password ! "})
    }
    const token=user.generateToken()
    const {password , ...other}=user._doc
    res.status(200).json({token,...other})
    })
module.exports={register,login}