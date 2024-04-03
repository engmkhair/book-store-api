const express=require('express')
const router=express.Router()
const joi=require('joi')
const { getAllBooks,getBookById, createBook, updateBook, deleteBook }=require("../controllers/bookController")
const {verifyTokenAndAdmin}=require("../middleware/verifyToken")
// const books=[
//     {
//         id:1,
//         author:"nasim",
//         title:"live"
//     },
//     {
//         id:2,
//         author:"bilal",
//         title:"love"
//     }
//     ]
    router.route("/")
                        .get(getAllBooks)
                        .post(verifyTokenAndAdmin,createBook)
   router.route("/:id")                     
                         .get(getBookById)
                        .put(verifyTokenAndAdmin,updateBook)
                        .delete(verifyTokenAndAdmin,deleteBook)

    module.exports=router