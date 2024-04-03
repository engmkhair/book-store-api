const mongoose=require("mongoose")
const joi=require('joi')
const jwt=require("jsonwebtoken")
const UserSchema=new mongoose.Schema({
    email:{
        type: String,
        required:true,
        minLength:5,
        maxLength:100,
        trim:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        minLength:2,
        maxLength:200,
        trim:true,
       
    },
    password:{
        type:String,
        required:true,
        minLength:5,
        trim:true,
       
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps : true })
//Generate Token
UserSchema.methods.generateToken=function () {
    return jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET_KEY/* ,{expiresIn:"4h"} */)
}
//usermodel
const User=mongoose.model("user",UserSchema)
//validate rigester user
function validateRigesterUser(obj){
    const schema=joi.object({
        email:joi.string().required().trim().min(5).max(100).email(),
        username:joi.string().required().trim().min(2).max(200),
        password:joi.string().required().trim().min(5),
    })
    return schema.validate(obj)
}
//validate login user
function validateLoginUser(obj){
    const schema=joi.object({
        email:joi.string().required().trim().min(5).max(100).email(),
        password:joi.string().required().trim().min(5),
     })
    return schema.validate(obj)
}
//validate update user
function validateUpdateUser(obj){
    const schema=joi.object({
        email:joi.string().trim().min(5).max(100).email(),
        username:joi.string().trim().min(2).max(200),
        password:joi.string().trim().min(5),
    })
    return schema.validate(obj)
}
module.exports={
    User,validateRigesterUser,validateLoginUser,validateUpdateUser
}