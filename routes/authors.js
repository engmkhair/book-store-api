const express=require('express')
const router=express.Router()
const { getAuthors, getAuthorsById, createAuthor, updateAuthor, deleteAuthor }=require("../controllers/authorcontroller")
const {verifyTokenAndAdmin}=require("../middleware/verifyToken")
//const router = require('./books')

// const authors=[
//     {id:1,
//     firstName:"nasim",
//     lastName:"ahmad",
//     nationality:"iraq",},
// ]
router.route("/")
         .get(getAuthors)
         .post(verifyTokenAndAdmin,createAuthor)

router.route("/:id")
        .put(verifyTokenAndAdmin,updateAuthor)
        .get(getAuthorsById)
        .delete(verifyTokenAndAdmin,deleteAuthor)

module.exports=router