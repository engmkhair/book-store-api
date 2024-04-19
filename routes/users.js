const express=require('express')
const router=express.Router()
const {verifyTokenAndAuthrization, verifyTokenAndAdmin}=require("../middleware/verifyToken")
const { updateUser, getAllUsers, getUserById, deleteUsers } = require('../controllers/usercontroller')
 
router.put("/:id",verifyTokenAndAuthrization,updateUser)

router.get("/",verifyTokenAndAdmin,getAllUsers)

router.get("/:id",verifyTokenAndAuthrization,getUserById)
   
router.delete("/:id",verifyTokenAndAuthrization,deleteUsers)
module.exports=router