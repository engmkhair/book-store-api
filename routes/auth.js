const express=require('express')
const router=express.Router()
const bcrypt=require("bcryptjs")
const asyncHandler=require("express-async-handler")
const {User,validateRigesterUser,validateLoginUser}=require("../models/user")
const { register, login } = require('../controllers/authcontroller')


router.post("/rigester",register)
router.post("/login",login)
module.exports=router