const ascyncHandler=require("express-async-handler")
const {User, validateUpdateUser}=require("../models/user")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const nodemailer=require("nodemailer")
/**
 * @desc...Get forgot password view 
 * @route .../password/forgot-password
 * @method Get
 * @access  public
 */

module.exports.getForgotPasswordView=ascyncHandler((req,res)=>{
    res.render('forgot-password')
})

/**
 * @desc...send forgot password link
 * @route .../password/forgot-password
 * @method Post
 * @access  public
 */

module.exports.sendForgotPasswordLink=ascyncHandler(async(req,res)=>{
const user=await User.findOne({email:req.body.email})
if(!user)
{
   return res.status(404).json({message:"user not found !"})
}
const secret=process.env.JWT_SECRET_KEY +user.password
const token=jwt.sign({email:user.email,id:user.id},secret,{expiresIn:'10m'})
const link=`http://localhost:5000/password/reset-password/${user._id}/${token}`
//res.json({message:"click on the link",resetPasswordLink:link})
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASS
    }
})
const mailOption={
    from:process.env.USER_EMAIL,
    to:user.email,
    subject:"Reset password",
    html:`<div>
    <h4>click on the link below to reset your password</h4>
    <p>${link}</p>
    </div>`
}
transporter.sendMail(mailOption,function(error,success){
    if(error){
        console.log(error)
    }else{
        console.log("Email sent"+success.response)
    }
})
res.render("link-send")
})
/**
 * @desc...Get reset password view
 * @route .../password/reset-password/:userId/:token
 * @method GET
 * @access  public
 */

module.exports.getResetPasswordView=ascyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.userId)
    if(!user)
    {
       return res.status(404).json({message:"user not found !"})
    }
    const secret=process.env.JWT_SECRET_KEY +user.password
    try {
        jwt.verify(req.params.token,secret)
        res.render('reset-password',{email:user.email})
    } catch (error) {
        console.log(error)
        res.json({message:"ERROR"})
    }
    })
    /**
 * @desc... reset the password 
 * @route .../password/reset-password/:userId/:token
 * @method Post
 * @access  public
 */

module.exports.resetThePassword=ascyncHandler(async(req,res)=>{
    //to do :validation
    const user=await User.findById(req.params.userId)
    if(!user)
    {
       return res.status(404).json({message:"user not found !"})
    }
    const secret=process.env.JWT_SECRET_KEY +user.password
    try {
        jwt.verify(req.params.token,secret)
       const salt=await bcrypt.genSalt(10)
       req.body.password=await bcrypt.hash(req.body.password,salt)
       user.password=req.body.password
       await user.save()
       res.render("success-password")
    } catch (error) {
        console.log(error)
        res.json({message:"ERROR"})
    }
    })